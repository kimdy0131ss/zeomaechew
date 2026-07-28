-- Convert the legacy single-value company column to a multi-value text array.
-- The old constraint must be removed before the type conversion because it
-- compares company to a scalar text value.

alter table public.menus
drop constraint if exists menus_company_check;

alter table public.menus
alter column company type text[]
using case
  when company is null then null
  else string_to_array(company, ',')
end;

alter table public.menus
add constraint menus_company_check
check (
  company is null
  or (
    cardinality(company) > 0
    and company <@ array['solo', 'pair', 'group']::text[]
  )
);
