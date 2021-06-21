// { id: 1, firstName: 'Zach', lastName: 'Young', email: 'zach@codefiworks.com', password: 'zry3784' }
export class User {
  id: number | null
  firstName: string
  lastName: string
  email: string
  password: string
  accessToken: string | null
  constructor({
    firstName = '',
    lastName = '',
    email = '',
    password = '',
    ...rest
  }) {
    Object.assign(this, rest)
    this.id = rest.id ? rest.id : null
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.password = password
    this.accessToken = rest.accessToken ? rest.accessToken : null
  }
}
