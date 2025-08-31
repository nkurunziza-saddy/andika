-- Create chapters table for document organization
create table if not exists public.chapters (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.documents(id) on delete cascade,
  title text not null default 'Untitled Chapter',
  content jsonb default '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":""}]}]}',
  order_index integer not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for chapters
alter table public.chapters enable row level security;

-- Create policies for chapters (inherit from document ownership)
create policy "chapters_select_own"
  on public.chapters for select
  using (
    exists (
      select 1 from public.documents 
      where documents.id = chapters.document_id 
      and documents.user_id = auth.uid()
    )
  );

create policy "chapters_insert_own"
  on public.chapters for insert
  with check (
    exists (
      select 1 from public.documents 
      where documents.id = chapters.document_id 
      and documents.user_id = auth.uid()
    )
  );

create policy "chapters_update_own"
  on public.chapters for update
  using (
    exists (
      select 1 from public.documents 
      where documents.id = chapters.document_id 
      and documents.user_id = auth.uid()
    )
  );

create policy "chapters_delete_own"
  on public.chapters for delete
  using (
    exists (
      select 1 from public.documents 
      where documents.id = chapters.document_id 
      and documents.user_id = auth.uid()
    )
  );

-- Create index for better performance
create index if not exists chapters_document_id_order_idx on public.chapters(document_id, order_index);

-- Function to automatically create first chapter for new documents
create or replace function public.create_default_chapter()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Only create default chapter for document type (not notes or templates)
  if new.document_type = 'document' then
    insert into public.chapters (document_id, title, order_index)
    values (new.id, 'Chapter 1', 0);
  end if;
  return new;
end;
$$;

drop trigger if exists on_document_created on public.documents;

create trigger on_document_created
  after insert on public.documents
  for each row
  execute function public.create_default_chapter();
