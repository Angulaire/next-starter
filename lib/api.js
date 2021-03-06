import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

export function getArticleSlugs(lang) {
  const postsDirectory = join(process.cwd(), `content/${lang}/articles`)
  return fs.readdirSync(postsDirectory)
}

export function getArticleBySlug(lang, slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const postsDirectory = join(process.cwd(), `content/${lang}/articles`)
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (data[field]) {
      items[field] = data[field]
    }

    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (field === 'date') {
      items[field] = data[field].toString()
    }

    if (field === 'minReading') {
      items[field] = Math.ceil(readingTime(content).minutes)
    }

    if (field === 'author') {
      const author = getAuthorByPath(data.author)
      items[field] = author
    }

  })
  return items
}

export function getAllArticles(lang, fields = [], cat = null) {
  const slugs = getArticleSlugs(lang)
  const posts = slugs
    .map((slug) => getArticleBySlug(lang, slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? '-1' : '1'))
  const catPosts = cat ? posts.filter(article => article.category.toLowerCase() === cat) : posts
  return catPosts
}

export function getAuthorByPath(path) {
  const fullPath = join(path)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data } = matter(fileContents)
  return data
}

export function getPageData(locale, slug) {
  return require(`content/${locale}/${slug}.json`)
}

export function getGlobalData(locale) {
  return require(`content/${locale}/global.json`)
}