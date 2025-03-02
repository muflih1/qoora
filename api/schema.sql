create table if not exists products (
  id serial primary KEY,
  name varchar(255) not null,
  image_url varchar(255) not null,
  price decimal(10, 2) not null,
  created_time timestamptz default now()
);

create table if not exists users (
  id bigint primary key,
  given_name varchar(50) not null,
  family_name varchar(50),
  email varchar(255) not null unique,
  password_digest varchar(255) not null,
  picture_url text default 'https://qoora.onrender.com/media/default_profiles/default_profile_picture.webp',
  biography text,
  created_time timestamptz default now(),
  updated_time timestamptz default now()
);

create table if not exists sessions (
  id bigint not null primary key,
  token_digets varchar(44) not null unique,
  user_id bigint references users(id) on delete cascade,
  user_agent text,
  ip_address inet,
  last_refreshed timestamptz default null,
  expires timestamptz not null,
  last_activity_time timestamptz default now(),
  created_time timestamptz default now()
);

create index idx_sessions_user_id on sessions(user_id);

alter table users alter column picture_url drop not null;

create table if not exists questions (
  id bigint not null primary key,
  quetion_text varchar(255) not null,
  question_embedding vector(384),
  author_id bigint not null references users(id) on delete cascade,
  created_time timestamptz default now(),
  updated_time timestamptz default now()
);

create table if not exists answers (
  id bigint not null primary key,
  answer_text text not null,
  author_id bigint not null references users(id) on delete cascade,
  question_id bigint not null references questions(id) on delete cascade,
  deleted_at timestamptz default null,
  created_time timestamptz default now(),
  updated_time timestamptz default now()
);

create index idx_answers_question_id on answers(question_id);
create index idx_answers_author_id on answers(author_id);

create table if not exists images (
  id bigint not null primary key,
  filename varchar(32) not null,
  url varchar(255) not null,
  created_time timestamptz default now()
);

create table if not exists answer_images (
  answer_id bigint not null references answers(id) on delete cascade,
  image_id bigint not null references images(id) on delete cascade,
  primary key (answer_id, image_id)
);

alter table questions add column slug varchar(255) not null;

create table votes (
  user_id bigint not null,
  answer_id bigint not null,
  vote_type smallint check (vote_type in (-1, 1)),
  created_time timestamptz default now(),
  primary key (answer_id, user_id),
  foreign key (user_id) references users(id) on delete cascade,
  foreign key (answer_id) references answers(id) on delete cascade
);

create index idx_votes_vote_type on votes(vote_type);

create table email_verification_codes (
  email text not null,
  verification_code integer not null,
  created_at timestamptz default now(),
  expires_at timestamptz default now() + interval '30 minutes',
  is_used boolean default false,
  primary key (email, verification_code)
);