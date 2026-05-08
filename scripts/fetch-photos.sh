#!/usr/bin/env bash
# Fetch + process photos from Wikimedia Commons for Sullivan County site.
# Usage: ./scripts/fetch-photos.sh
#
# For each entry:
#  1. Resolve Commons file URL via API
#  2. Download original
#  3. Resize to 640w + 1024w (sips, preserves aspect)
#  4. Encode WebP for each (cwebp at quality 80)
#  5. Strip EXIF (sips -s formatOptions normal removes most)
#
# Output: public/images/{kind}/{slug}-{640|1024}.{jpg|webp}

set -e

# Tab-separated: kind|slug|commons-filename|max-width
ENTRIES=(
  "audience|eastman-aerial|Aerial_view_of_the_Eastman_Chemical_plant_in_Kingsport,_TN.jpg|2400"
  "communities|kingsport-church-circle|Church_Circle_District,_Kingsport.jpg|2400"
  "communities|bristol-state-street|Bristol_VA_TN_Double_Yellow_Line_State_Street.jpg|2400"
  "communities|blountville-deery-inn|Blountville-deery-inn-tn1.jpg|2400"
  "communities|bluff-city-choates-ford|Bluff_City,_TN_with_Choates_Ford_(17ac4f76-1dd8-b71c-073c-dc7ed8183e71).jpg|2400"
  "communities|piney-flats-electric|Piney_Flats_Electric_Company_-_NARA_-_281088.jpg|2400"
  "communities|colonial-heights-cornstalk|Cornstalk-heights-house-tn1.jpg|2400"
)

UA="Mozilla/5.0 SullivanCountyTN/1.0 (cody@boring.works)"

for entry in "${ENTRIES[@]}"; do
  IFS='|' read -r kind slug commons_name maxw <<<"$entry"
  outdir="public/images/${kind}"
  mkdir -p "$outdir"

  # Skip if -1024.jpg already exists (idempotent)
  if [ -f "${outdir}/${slug}-1024.jpg" ]; then
    echo "[skip] ${slug} already processed"
    continue
  fi

  echo "[fetch] ${commons_name}"
  # Resolve actual file URL via Commons API
  url=$(/usr/bin/curl -s -A "$UA" "https://commons.wikimedia.org/w/api.php?action=query&prop=imageinfo&iiprop=url&iiurlwidth=${maxw}&format=json&titles=File:${commons_name}" \
    | python3 -c "import json,sys; d=json.load(sys.stdin); pages=d['query']['pages']; p=next(iter(pages.values())); ii=p.get('imageinfo',[{}])[0]; print(ii.get('thumburl') or ii.get('url',''))")

  if [ -z "$url" ]; then
    echo "[err] no URL for ${commons_name}"
    continue
  fi

  tmp=$(mktemp -t sc-photo-XXXXXX).jpg
  /usr/bin/curl -s -A "$UA" -o "$tmp" "$url"
  size=$(wc -c <"$tmp" | tr -d ' ')
  if [ "$size" -lt 5000 ]; then
    echo "[err] ${commons_name} download too small: ${size} bytes"
    rm -f "$tmp"
    continue
  fi

  # Resize 1024w + 640w (preserves aspect, fits within bound)
  sips -Z 1024 "$tmp" --out "${outdir}/${slug}-1024.jpg" >/dev/null
  sips -Z 640  "$tmp" --out "${outdir}/${slug}-640.jpg"  >/dev/null

  # WebP encode at q80
  cwebp -quiet -q 80 "${outdir}/${slug}-1024.jpg" -o "${outdir}/${slug}-1024.webp"
  cwebp -quiet -q 80 "${outdir}/${slug}-640.jpg"  -o "${outdir}/${slug}-640.webp"

  rm -f "$tmp"

  echo "[ok] ${slug}: $(ls -la ${outdir}/${slug}-*.jpg ${outdir}/${slug}-*.webp 2>/dev/null | awk '{print $5,$9}' | tr '\n' ' ')"
done

echo
echo "=== Final inventory ==="
ls -la public/images/audience/ public/images/communities/ 2>/dev/null
