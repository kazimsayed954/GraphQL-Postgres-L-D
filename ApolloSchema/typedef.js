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

type Salary{
    employee_id:ID
    salary:Int
    date:String
}

type EmployeeAndRoles{
    employee_id:ID
    role_id:ID
    date:String
    first_name:String
    last_name:String
    email:String
    hire_date:String
    department_id:ID,
    title:String
    salary:Int
    role_title:String
}

type Query{
    getUsers:[User]
    getUser(id:ID!):User
    getUserByName(query:String!):[User]
    getEmployeeAndRoles:[EmployeeAndRoles]
    getEmployeeAndRolesById(employee_id:ID!):EmployeeAndRoles
    getDepartments:[Department]
    getRoles:[Role]
    getEmployeeAndRolesWithSearch(searchTerm:String):[EmployeeAndRoles]
}

type Mutation{
    addUser(user:addUserDataInput!):User
    updateUser(id:ID!,edits:updateUserDataInput!):User
    deleteUser(id:ID!):Boolean
    addDepartment(name:String!):Department
    addEmployee(department_id:ID!,employee:addEmployeeInput!):Employee
    addRole(role:addRoleInput!):Role
    addEmployeeAndRole(employee_id:ID!,role_id:ID!):EmployeeAndRoles
    addSalary(employee_id:ID!,salary:Int!):Salary
    updateSalary(employee_id:ID!,salary:Int!):Salary
    deleteEmployeeAndRole(employee_id:ID!):Boolean
    deleteRole(role_id:ID!):Boolean
    updateRole(role_id:ID!,title:String):Role
    updateDepartment(department_id:ID!,name:String!):Department
    deleteDepartment(department_id:ID!):Boolean
    updateEmployee(employee_id:ID!,department_id:ID!,employee:updateEmployeeInput):Employee
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

input updateEmployeeInput{
    first_name:String
    last_name:String
    email:String
}

input addRoleInput{
    title:String!
}
`;

module.exports = typeDefs