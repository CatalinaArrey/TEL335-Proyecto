import userActions from '../../src/actions/user/user'

const mockUsers = [
  {
    username: "anto1",
    email: "anto@gmail.com",
    password: "antoPass",
    phone: "+56912345678"
  },
  {
    username: "cata1",
    email: "cata@gmail.com",
    password: "Cata1234",
    phone: "+56987654321"
  }
]

const sameEmail = {
  username: "anto2",
  email: "anto@gmail.com",
  password: "antoPass",
  phone: "+56912345678"
}

const sameUsername = {
  username: "anto1",
  email: "anto2@gmail.com",
  password: "antoPass",
  phone: "+56912345678",
};

describe("get users", () => {
  beforeEach(() => {
    userActions.clearUsers();
  })

  test("should return empty list if there are no users", () => {
    const users = userActions.getAllUsers()

    expect(users).toEqual([])
  })
    
  test("should return array of users if they exist", () => {
    userActions.createUser(mockUsers[0])
    userActions.createUser(mockUsers[1])

    const users = userActions.getAllUsers();

    expect(users).toEqual(mockUsers);
  })
})

describe("create user", () => {
  beforeEach(() => {
    userActions.clearUsers();
  });

  test("should create a new user correctly", () => {
    const newUser = userActions.createUser(mockUsers[0])
    const users = userActions.getAllUsers()

    expect(newUser).toEqual(mockUsers[0])
    expect(users).toContainEqual(mockUsers[0])
  })

  test("should throw an error if email is already in use", () => {
    userActions.createUser(mockUsers[0])
    const newUser = userActions.createUser(sameEmail)
  })
  
  test("should throw an error if username is already in use", () => {
    userActions.createUser(mockUsers);
  });
})

/* login */
// should return 1 if credentials are correct
// should return 0 if username doesn't exist
// should return 0 if email is not registered  
// should return 0 if password doesn't match

/* logout */
// should return 0
