const {gql} = require('apollo-server')

const typeDefs = gql`
type User{
    id:ID
    firstName:String
    lastName:String
    email:String
}

type Department{
    department_id:ID!
    name:String!
}

type Role{
    role_id:ID
    title:String
    salary:Int
}

type Employee{
    employee_id:ID
    first_name:String
    last_name:String
    email:String
    hire_date:String
    department_id:ID
}

type Query{
    getUsers:[User]
    getUser(id:ID!):User
    getUserByName(query:String!):[User]
}

type Mutation{
    addUser(user:addUserDataInput!):User
    updateUser(id:ID!,edits:updateUserDataInput!):User
    deleteUser(id:ID!):Boolean
    addDepartment(name:String!):Department
    addEmployee(department_id:ID!,employee:addEmployeeInput!):Employee
    addRole(role:addRoleInput!):Role
}

input addUserDataInput{
    firstName:String!
    lastName:String!
    email:String!
}

input updateUserDataInput{
    firstName:String
    lastName:String
    email:String
}

input addEmployeeInput{
    first_name:String!
    last_name:String!
    email:String!
}

input addRoleInput{
    title:String!
    salary:Int!
}
`;

module.exports = typeDefs