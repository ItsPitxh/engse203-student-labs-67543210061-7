const student  = {
    name: "Pich Sintornswat",
    studentId: "67543210061-7",
    os: process.platform,
    node: process.version,
}

function createGreeting({name, studentId, os, node }) {
    return `Hello ${name} (${studentId} | ${os} | ${node})`
}

console.log(createGreeting(student))