import { directoryNames } from '@/i18n/i18n'
import type { PersonData } from '@/people'
import { peopleData } from '@/people'
import getPagePath from '@/utilities/getPagePath'
import slugify from '@sindresorhus/slugify'

export interface Person extends PersonData {
  [x: string]: any
  [x: string]: any
  mail: any
  mastodon: any
  description: any
  mail: any
  fullName: string
  id: string
}

const getFullName = (person: PersonData) => {
  let fullName = person.givenName
  if (person.surName) fullName += ` ${person.surName}`
  if (!fullName)
    throw new Error('Person needs at least a given name or surname.')
  fullName = fullName.trim()
  return fullName
}

export const people = peopleData
  .filter(person => {
    return person.publishProfile !== false
  })
  .map(person => ({ ...person, fullName: getFullName(person) }))
  .map(person => ({ ...person, id: slugify(person.fullName) }))

export const getPersonPath = (
  locale: string,
  id: string,
  addLeadingSlash = true,
) => {
  // biome-ignore lint/complexity/useLiteralKeys: <explanation>
  const directories = [directoryNames['people'][locale]]
  return getPagePath(locale, directories, id, addLeadingSlash)
}
