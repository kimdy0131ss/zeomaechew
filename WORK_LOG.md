# 작업 내용

## 프로젝트 개요

`MENU TREE`는 사용자가 몇 가지 식사 조건을 선택하면 의사결정 트리를 따라 메뉴 후보를 좁혀 주는 React 기반 웹 애플리케이션입니다.

## 구현 내용

- 식사 조건을 단계별 질문과 선택지로 구성했습니다.
- 현재 노드의 후보 메뉴를 기준으로 선택 가능한 항목과 남은 메뉴 수를 표시했습니다.
- 선택 결과를 트리 노드로 저장해 동일한 경로를 다시 선택해도 기존 노드를 재사용하도록 구현했습니다.
- 모든 질문에 답하면 조건에 맞는 메뉴의 카테고리, 가격 범위, 설명을 결과 카드로 보여 줍니다.
- 처음부터 다시 선택할 수 있는 재시작 기능을 추가했습니다.
- Supabase 환경 변수가 설정된 경우 `menus` 테이블에서 메뉴 데이터를 불러옵니다.
- Supabase를 사용할 수 없거나 메뉴를 불러오는 데 실패하면 내장 예시 메뉴로 동작하도록 처리했습니다.

## 주요 구성

| 경로 | 역할 |
| --- | --- |
| `src/App.tsx` | 화면 렌더링, 메뉴 로드, 선택 및 재시작 상태 관리 |
| `src/data/decisionTree.ts` | 질문 순서와 각 질문의 선택지 정의 |
| `src/services/menuDecisionTree.ts` | 메뉴 후보를 필터링하는 의사결정 트리 로직 |
| `src/services/menuService.ts` | Supabase `menus` 테이블 조회 및 데이터 형식 변환 |
| `src/lib/supabase.ts` | 환경 변수를 사용한 Supabase 클라이언트 초기화 |
| `src/types/menu.ts` | 메뉴 및 선택 조건 타입 정의 |

## 실행 방법

```bash
npm install
npm run dev
```

## Supabase 설정 (선택)

Supabase 데이터를 사용하려면 프로젝트 환경 변수에 다음 값을 설정합니다.

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

환경 변수가 없으면 예시 메뉴 데이터로 화면을 확인할 수 있습니다.

## 복수 인원 설정

한 메뉴를 혼자, 둘이, 여럿이 먹을 수 있도록 `company`에 복수 값을 저장할 수 있습니다. 앱은 기존 단일 텍스트 값과 PostgreSQL `text[]` 배열 값을 모두 지원합니다.

기존 제약 조건이 단일 문자열 비교를 사용하므로, Supabase SQL Editor에서 반드시 제약 조건을 먼저 삭제한 뒤 배열로 변환해야 합니다. 전체 마이그레이션은 `supabase/migrate_company_to_array.sql`에 있습니다.

```sql
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
```

이후 메뉴의 인원 조건은 다음처럼 설정합니다.

```sql
update public.menus
set company = array['pair', 'group']
where name = '해물 파전';
```

기존 `text` 열을 유지할 경우에도 `pair,group`처럼 쉼표로 구분해 저장할 수 있습니다.

## 메뉴 시드 데이터

`supabase/seed_menus.sql`에는 분식집, 한식당, 중식당, 일반 파스타집과 프랜차이즈에서 쉽게 접할 수 있는 한식, 아시아식, 양식 메뉴를 추가하는 SQL이 있습니다. 모든 선택 값(`meal_time`, `meal_format`, `temperature`, `weight`, `spicy_level`, `company`, `main_ingredient`)을 사용해 결과가 한쪽으로 치우치지 않도록 구성했습니다.

테이블을 새로 만들었을 때는 Supabase SQL Editor에서 다음 순서로 실행합니다.

1. 잘못 생성된 테이블이 있으면 `supabase/recreate_menus_table.sql`, 없으면 `supabase/create_menus_table.sql`
2. `supabase/seed_menus.sql`

`create_menus_table.sql`은 앱에서 필요한 모든 열과 유효성 검사, 그리고 웹에서 메뉴를 읽을 수 있는 RLS 조회 정책을 만듭니다.
