import { describe, expect, it } from "vitest";
import { recurringMeetings } from "~/data/meetings";

describe("meeting data", () => {
  it("gives every recurring meeting action paths citizens expect", () => {
    for (const meeting of recurringMeetings) {
      expect(meeting.name).toBeTruthy();
      expect(meeting.location).toBeTruthy();
      expect(meeting.actions.length).toBeGreaterThan(0);
      for (const action of meeting.actions) {
        expect(action.label).toBeTruthy();
        expect(action.href).toMatch(action.external ? /^https:\/\// : /^\//);
      }
    }
  });
});
