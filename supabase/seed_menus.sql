-- MENU TREE sample menu data.
-- Run after changing public.menus.company to text[] as documented in WORK_LOG.md.

insert into public.menus (
  name, category, price_from, price_to, weight, temperature, spicy_level,
  meal_time, company, main_ingredient, meal_format, description
) values
  ('김치찌개 정식', '한식', 9000, 12000, 'heavy', 'hot', 'medium', 'lunch', array['solo', 'pair'], 'meat', 'one_dish', '잘 익은 김치와 돼지고기를 넣어 든든하게 끓인 한 끼입니다.'),
  ('제육덮밥', '한식', 8500, 11000, 'heavy', 'hot', 'medium', 'lunch', array['solo', 'pair'], 'meat', 'one_dish', '매콤달콤한 제육볶음을 밥 위에 듬뿍 올린 메뉴입니다.'),
  ('불고기 비빔밥', '한식', 10000, 13000, 'heavy', 'mild', 'none', 'lunch', array['solo', 'pair'], 'meat', 'one_dish', '불고기와 여러 채소를 고추장에 비벼 먹는 균형 잡힌 식사입니다.'),
  ('콩나물국밥', '한식', 7500, 9500, 'heavy', 'hot', 'none', 'lunch', array['solo'], 'vegetable', 'one_dish', '뜨끈한 국물과 아삭한 콩나물이 속을 편안하게 채워 줍니다.'),
  ('닭갈비', '한식', 13000, 18000, 'heavy', 'hot', 'medium', 'dinner', array['pair', 'group'], 'meat', 'share', '매콤한 양념 닭고기와 채소를 함께 볶아 나눠 먹기 좋습니다.'),
  ('보쌈', '한식', 18000, 28000, 'heavy', 'hot', 'none', 'dinner', array['pair', 'group'], 'meat', 'share', '부드러운 수육을 김치와 곁들여 푸짐하게 즐기는 메뉴입니다.'),
  ('해물파전', '한식', 12000, 18000, 'heavy', 'hot', 'none', 'dinner', array['pair', 'group'], 'seafood', 'share', '바삭하게 부친 전 위에 해산물을 넉넉히 올린 메뉴입니다.'),
  ('비빔국수', '한식', 7500, 9500, 'light', 'cold', 'medium', 'lunch', array['solo', 'pair'], 'vegetable', 'one_dish', '새콤달콤한 양념과 쫄깃한 면이 입맛을 깨워 줍니다.'),
  ('냉면', '한식', 10000, 13000, 'light', 'cold', 'none', 'lunch', array['solo', 'pair'], 'meat', 'one_dish', '차가운 육수와 담백한 면을 산뜻하게 즐기는 메뉴입니다.'),
  ('떡볶이 모둠', '한식', 9000, 14000, 'adventurous', 'hot', 'medium', 'late', array['pair', 'group'], 'vegetable', 'share', '떡볶이와 튀김, 순대를 함께 나눠 먹는 늦은 시간 메뉴입니다.'),
  ('소고기 쌀국수', '아시아식', 9500, 12000, 'heavy', 'hot', 'none', 'lunch', array['solo', 'pair'], 'meat', 'one_dish', '맑고 진한 육수에 부드러운 소고기를 올린 쌀국수입니다.'),
  ('마라탕', '아시아식', 12000, 18000, 'adventurous', 'hot', 'high', 'dinner', array['solo', 'pair'], 'meat', 'one_dish', '원하는 재료를 골라 얼얼하고 화끈하게 즐기는 한 그릇입니다.'),
  ('마라샹궈', '아시아식', 18000, 30000, 'adventurous', 'hot', 'high', 'dinner', array['pair', 'group'], 'meat', 'share', '향신료에 볶은 재료를 여럿이 나눠 먹는 강렬한 메뉴입니다.'),
  ('새우 딤섬', '아시아식', 10000, 15000, 'light', 'hot', 'none', 'late', array['pair', 'group'], 'seafood', 'share', '뜨거운 딤섬을 여러 종류로 골라 나눠 먹기 좋습니다.'),
  ('연어 포케', '아시아식', 11000, 15000, 'light', 'cold', 'none', 'lunch', array['solo', 'pair'], 'seafood', 'one_dish', '신선한 연어와 채소, 곡물을 한 그릇에 담은 메뉴입니다.'),
  ('참치마요 삼각김밥', '아시아식', 2500, 4000, 'light', 'mild', 'none', 'late', array['solo'], 'seafood', 'handheld', '간편하게 들고 먹기 좋은 고소한 참치마요 삼각김밥입니다.'),
  ('치킨 타코', '양식', 9000, 14000, 'adventurous', 'mild', 'medium', 'late', array['solo', 'pair'], 'meat', 'handheld', '바삭한 치킨과 채소를 또르띠야에 담은 간편한 메뉴입니다.'),
  ('페퍼로니 피자', '양식', 16000, 24000, 'heavy', 'hot', 'none', 'dinner', array['pair', 'group'], 'meat', 'share', '짭짤한 페퍼로니와 치즈를 넉넉히 올린 나눔 메뉴입니다.'),
  ('버섯 크림 파스타', '양식', 13000, 17000, 'heavy', 'hot', 'none', 'dinner', array['solo', 'pair'], 'vegetable', 'one_dish', '고소한 크림소스와 버섯 향을 즐기는 부드러운 파스타입니다.'),
  ('해산물 토마토 파스타', '양식', 14000, 18000, 'heavy', 'hot', 'medium', 'dinner', array['solo', 'pair'], 'seafood', 'one_dish', '토마토소스에 해산물을 더해 산뜻하고 진하게 완성한 파스타입니다.'),
  ('치킨 시저 샐러드', '양식', 9000, 12000, 'light', 'cold', 'none', 'lunch', array['solo'], 'meat', 'one_dish', '구운 치킨과 로메인, 치즈를 곁들인 가벼운 샐러드입니다.'),
  ('쉬림프 샌드위치', '양식', 8000, 11000, 'light', 'cold', 'none', 'lunch', array['solo', 'pair'], 'seafood', 'handheld', '새우와 아삭한 채소를 듬뿍 넣은 산뜻한 샌드위치입니다.'),
  ('치즈버거 세트', '양식', 9500, 13000, 'heavy', 'hot', 'none', 'late', array['solo', 'pair'], 'meat', 'handheld', '육즙 가득한 패티와 치즈로 간편하게 든든함을 채웁니다.'),
  ('나초 플래터', '양식', 12000, 18000, 'adventurous', 'hot', 'medium', 'late', array['pair', 'group'], 'vegetable', 'share', '바삭한 나초에 치즈와 살사를 올려 함께 즐기는 메뉴입니다.');
