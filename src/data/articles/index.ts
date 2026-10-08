import { Article } from '../../types/article';
import { baliArticle } from './bali';
import { parisArticle } from './paris';
import { santoriniArticle } from './santorini';
import { switzerlandArticle } from './switzerland';
import { maldivesArticle } from './maldives';
import { kyotoArticle } from './kyoto';
import { nycArticle } from './nyc';
import { dubaiArticle } from './dubai';
import { queenstownArticle } from './queenstown';
import { amalfiArticle } from './amalfi';

export const ALL_ARTICLES: Article[] = [
  baliArticle,
  parisArticle,
  santoriniArticle,
  switzerlandArticle,
  maldivesArticle,
  kyotoArticle,
  nycArticle,
  dubaiArticle,
  queenstownArticle,
  amalfiArticle,
];

export function getArticleById(id: string): Article | undefined {
  return ALL_ARTICLES.find((article) => article.id === id);
}

export function getNextAndPrevArticles(currentId: string): { prev?: Article; next?: Article } {
  const index = ALL_ARTICLES.findIndex((a) => a.id === currentId);
  if (index === -1) return {};
  const prev = index > 0 ? ALL_ARTICLES[index - 1] : ALL_ARTICLES[ALL_ARTICLES.length - 1];
  const next = index < ALL_ARTICLES.length - 1 ? ALL_ARTICLES[index + 1] : ALL_ARTICLES[0];
  return { prev, next };
}
