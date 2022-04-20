-- Create Database
create database email_scheduler;

-- Create Table(s)
CREATE TABLE `email_schedule_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `to_email_ids` varchar(255) NOT NULL,
  `cc_email_ids` varchar(255) NOT NULL,
  `bcc_email_ids` varchar(255) NOT NULL,
  `email_subject` varchar(255) NOT NULL,
  `email_body` text,
  `schedule_date_time` datetime DEFAULT DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` int(11) NOT NULL DEFAULT '0',
  `created_by` varchar(45) DEFAULT NULL,
  `updated_by` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1