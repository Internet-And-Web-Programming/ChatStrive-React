-- before running this script, make sure you have a database named "ChatStrive"
-- and a table named "Users" in that database
-- this script will create the table "Users" if it does not exist
create database if not exists ChatStrive;
use ChatStrive;
create table if not exists Users (
  id int not null auto_increment,
  UserID varchar(255) not null unique,
  Name varchar(255) not null,
  Username varchar(255) not null unique,
  Password varchar(255) not null,
  primary key (id)
);
-- To get all the users that are connected to that particular user
create table if not exists Connections (
  UserID varchar(255) not null,
  connections varchar(5000) not null,
  FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
-- These will consist of all the series of messages that are there amoungst the users 
-- Needed to be called when a perticular user is selected.
create table if not exists Messages (
  id int not null auto_increment,
  -- UserID varchar(255) not null,
  SenderID varchar(255) not null,
  ReceiverID varchar(255) not null,
  Message varchar(255) not null,
  Time datetime not null default current_timestamp,
  seen boolean not null default false,
  PRIMARY KEY (id),
  -- FOREIGN KEY (UserID) REFERENCES Users(UserID),
  FOREIGN KEY (SenderID) REFERENCES Users(UserID),
  FOREIGN KEY (ReceiverID) REFERENCES Users(UserID)
);
--  These will consist of session of that particular users that are active and will be needed to manage the user's session.
create table if not exists Sessions (
  id int not null auto_increment,
  User1ID varchar(255) not null,
  User2ID varchar(255) not null,
  SeesionID varchar(255) not null,
  PRIMARY KEY (id),
  FOREIGN KEY (User1ID) REFERENCES Users(UserID),
  FOREIGN KEY (User2ID) REFERENCES Users(UserID)
);

-- These 2 tables must be there before execuritng the script.
-- Working Well.

-- Sample Insertion

-- To Delete them back.
Delete from Connections;
Delete from Users;

insert into Users (UserID, Name, Username, Password) values ('1000', 'DummyA', 'DummyA', 'fdd15c1d273d01055c87aa9f598cf264c456eacd');
insert into Users (UserID, Name, Username, Password) values ('2000', 'DummyB', 'DummyB', 'fdd15c1d273d01055c87aa9f598cf264c456eacd');
insert into Users (UserID, Name, Username, Password) values ('3000', 'DummyC', 'DummyC', 'fdd15c1d273d01055c87aa9f598cf264c456eacd');
insert into Connections (UserID, connections) values ('1000', '');
insert into Connections (UserID, connections) values ('2000', '');
insert into Connections (UserID, connections) values ('3000', '');


-- Adding Dummies; All the passwords are Tanmay1!
