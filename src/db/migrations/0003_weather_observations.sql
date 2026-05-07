CREATE TABLE `weather_observations` (
	`id` text PRIMARY KEY NOT NULL,
	`observed_at` text NOT NULL,
	`temperature_f` integer,
	`feels_like_f` integer,
	`humidity` integer,
	`wind_mph` integer,
	`wind_direction` text,
	`conditions` text,
	`alerts_count` integer DEFAULT 0 NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_weather_observations_observed_at` ON `weather_observations` (`observed_at` DESC);
