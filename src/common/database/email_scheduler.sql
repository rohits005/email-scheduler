-- Create Database
create database email_scheduler;

-- Create Table(s)
-- "email_schedule_details"
CREATE TABLE `email_schedule_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `to_email_ids` varchar(255) NOT NULL,
  `cc_email_ids` varchar(255) NOT NULL,
  `bcc_email_ids` varchar(255) NOT NULL,
  `email_subject` varchar(255) NOT NULL,
  `email_body` text,
  `schedule_date_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` int(11) NOT NULL DEFAULT '0',
  `created_by` varchar(45) DEFAULT NULL,
  `updated_by` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1

-- "unsent_schedule_emails"
CREATE TABLE `unsent_schedule_emails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mail_options` text,
  `schedule_date_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `unsent_email_reason` text,
  `status` int(11) NOT NULL DEFAULT '1',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1