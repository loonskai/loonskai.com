export const getShareLinks = ({ title, url }) => {
  const twitterUrl = new URL('https://twitter.com/intent/tweet')
  twitterUrl.searchParams.set('text', `${title} via @loonskai`)
  twitterUrl.searchParams.set('url', url)

  const linkedinUrl = new URL('https://www.linkedin.com/sharing/share-offsite')
  linkedinUrl.searchParams.set('url', url)

  const telegramUrl = new URL('https://t.me/share/url')
  telegramUrl.searchParams.set('url', url)
  telegramUrl.searchParams.set('text', `${title} via @loonskai`)

  const facebookUrl = new URL('https://www.facebook.com/sharer/sharer.php')
  facebookUrl.searchParams.set('u', url)

  return {
    twitter: twitterUrl.toString(),
    linkedin: linkedinUrl.toString(),
    telegram: telegramUrl.toString(),
    facebook: facebookUrl.toString(),
  }
}
