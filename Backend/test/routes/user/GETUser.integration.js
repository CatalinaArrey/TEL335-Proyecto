    test("should create user and return it if the data is correct", () => {
        const newUser = userActions.createUser(mockUsers[0])
        const users = userActions.getAllUsers()

        expect(newUser).toEqual(mockUsers[0])
        expect(users).toContainEqual(mockUsers[0])
    })

    describe("username", () => {
      // should raise an error if it is undefined
      // should raise an error if it is null
      // should raise an error if it doesn't have enough characters
    })
    
    describe("email", () => {
      // should raise an error if it is undefined
      // should raise an error if it is null
      // should raise an error if it doesn't follow an email structure
    });

    describe("password", () => {
      // should raise an error if it is undefined
      // should raise an error if it is null
      // should raise an error if it doesn't follow the structure
    });

    describe("phone", () => {
      // should raise an error if it is undefined
      // should raise an error if it is null
      // should raise an error if it doesn't follow the structure