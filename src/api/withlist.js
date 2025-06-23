import { supabase } from "./supabaseClient";

// 위시리스트 조회
export async function fetchWishlist(userId) {
  console.log("📦 fetchWishlist() 호출 userId:", userId);
  const { data, error } = await supabase
    .from("wishlist")
    .select("*")
    .eq("user_id", userId)
    .order("id", { ascending: false }); // 최근순

  if (error) {
    console.error("위시리스트 불러오기 실패:", error);
    return { data: [], error };
  }

  return { data, error };
}

// 영화 ID로 위시 여부 확인
export async function isInWishlist(userId, movieId) {
  const { data, error } = await supabase
    .from("wishlist")
    .select("movie_id")
    .eq("user_id", userId)
    .eq("movie_id", movieId); // 이거 숫자 그대로 유지

  if (error) {
    console.error("isInWishlist 오류:", error);
    return false;
  }

  console.log("Supabase 응답:", movieId);
  return data.length > 0;
}

// 추가
export async function addToWishlist(userId, movie) {
  const { data, error } = await supabase.from("wishlist").insert([
    {
      user_id: userId,
      movie_id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
    },
  ]);
  return { data, error };
}

// 제거
export async function removeFromWishlist(userId, movieId) {
  const { error } = await supabase
    .from("wishlist")
    .delete()
    .eq("user_id", userId)
    .eq("movie_id", Number(movieId));
  return { error };
}
