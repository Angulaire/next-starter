import { useRouter } from 'next/router';
import Select from 'components/common/Select';

const LangSelect = () => {
  const router = useRouter()
  const { locales, locale } = router

  const options = locales.map(lng => ({
    value: lng, label: lng.toUpperCase()
  }))

  function handleChange(lng) {
    router.push(router.asPath, router.asPath, { locale: lng.value })
  }

  return (
    <Select
      isSearchable={false}
      onChange={handleChange}
      defaultValue={router.locale}
      placeholder={locale.toUpperCase()}
      options={options}
      variant="link"
      width="80px"
    />
  )
}

export default LangSelect