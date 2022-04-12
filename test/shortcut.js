function foo() {
  return true
}

function bar() {
  return true
}

// const c1 = foo()
// const c2 = bar()
if (foo() || bar())
  console.log('c1 || c2')
