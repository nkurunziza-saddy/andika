-- Create versions table for document version control
create table if not exists public.document_versions (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.documents(id) on delete cascade,
  chapter_id uuid references public.chapters(id) on delete cascade,
  version_number integer not null,
  title text not null,
  content jsonb not null,
  commit_message text,
  is_auto_save boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for document_versions
alter table public.document_versions enable row level security;

-- Create policies for document_versions (inherit from document ownership)
create policy "versions_select_own"
  on public.document_versions for select
  using (
    exists (
      select 1 from public.documents 
      where documents.id = document_versions.document_id 
      and documents.user_id = auth.uid()
    )
  );

create policy "versions_insert_own"
  on public.document_versions for insert
  with check (
    exists (
      select 1 from public.documents 
      where documents.id = document_versions.document_id 
      and documents.user_id = auth.uid()
    )
  );

create policy "versions_update_own"
  on public.document_versions for update
  using (
    exists (
      select 1 from public.documents 
      where documents.id = document_versions.document_id 
      and documents.user_id = auth.uid()
    )
  );

create policy "versions_delete_own"
  on public.document_versions for delete
  using (
    exists (
      select 1 from public.documents 
      where documents.id = document_versions.document_id 
      and documents.user_id = auth.uid()
    )
  );

-- Create indexes for better performance
create index if not exists versions_document_id_idx on public.document_versions(document_id);
create index if not exists versions_chapter_id_idx on public.document_versions(chapter_id);
create index if not exists versions_created_at_idx on public.document_versions(created_at desc);

-- Function to create initial version for existing documents
create or replace function public.create_initial_version()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Create initial version for new documents
  insert into public.document_versions (
    document_id, 
    version_number, 
    title, 
    content, 
    commit_message,
    is_auto_save
  )
  values (
    new.id, 
    1, 
    new.title, 
    new.content, 
    'Initial version',
    false
  );
  return new;
end;
$$;

drop trigger if exists on_document_version_created on public.documents;

create trigger on_document_version_created
  after insert on public.documents
  for each row
  execute function public.create_initial_version();

-- Function to create initial version for new chapters
create or replace function public.create_initial_chapter_version()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Create initial version for new chapters
  insert into public.document_versions (
    document_id,
    chapter_id, 
    version_number, 
    title, 
    content, 
    commit_message,
    is_auto_save
  )
  values (
    new.document_id,
    new.id, 
    1, 
    new.title, 
    new.content, 
    'Initial chapter version',
    false
  );
  return new;
end;
$$;

drop trigger if exists on_chapter_version_created on public.chapters;

create trigger on_chapter_version_created
  after insert on public.chapters
  for each row
  execute function public.create_initial_chapter_version();
