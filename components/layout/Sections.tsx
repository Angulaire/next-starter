import Hero from 'components/sections/Hero';
import PageHero from 'components/sections/PageHero';
import Contact from 'components/sections/Contact';
import Article from 'components/sections/Article';
import ArticlesSearch from 'components/sections/ArticlesSearch';

export default function Sections({ sections }) {
  return (
    <>
      {sections.map(section => {
        if (section.template === 'hero'){
          return (
            <Hero 
              key={section.template}
              title={section.title}
              description={section.description}
              image={section.image}
            />
          )
        }
        if (section.template === 'page-hero'){
          return (
            <PageHero
              key={section.template}
              {...section}
            />
          )
        }
        if (section.template === 'article'){
          return (
            <Article
              key={section.template} 
              {...section.article}
            />
          )
        }
        if (section.template === 'contact-section'){
          return (
            <Contact
              key={section.template}
              {...section}
            />
          )
        }
        if (section.template === 'articles-search'){
          return (
            <ArticlesSearch
              key={section.template} 
              {...section}
            />
          )
        }
      })}
    </>
  )
}