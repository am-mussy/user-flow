import type { AuthOptions } from "next-auth";
import GoggleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import YandexProvider from "next-auth/providers/yandex";

export const authConfig: AuthOptions = {
  providers: [
    GoggleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.SECRET,
};

async function refreshAccessToken(token: ExtendedJWT): Promise<ExtendedJWT> {
  try {
    // Отправляем запрос на сервер для обновления токена
    const url = "https://your-auth-server.com/refresh-token";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken: token.refreshToken,
      }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.accessToken, // Обновленный access токен
      accessTokenExpires: Date.now() + 3600000, // Обновляем время истечения
      refreshToken: refreshedTokens.refreshToken ?? token.refreshToken, // Обновляем refresh токен, если он был предоставлен
    };
  } catch (error) {
    console.error("Error refreshing access token: ", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
