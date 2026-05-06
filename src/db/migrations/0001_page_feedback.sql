CREATE TABLE `page_feedback` (
	`id` text PRIMARY KEY NOT NULL,
	`page` text NOT NULL,
	`helpful` integer NOT NULL,
	`comment` text,
	`user_agent` text,
	`created_at` text NOT NULL
);
