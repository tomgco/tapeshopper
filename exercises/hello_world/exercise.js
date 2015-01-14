var exercise      = require('workshopper-exercise')()
  , filecheck     = require('workshopper-exercise/filecheck')
  , execute       = require('workshopper-exercise/execute')
  , wrappedexec   = require('workshopper-wrappedexec')
  , parser = require('tap-parser')


// checks that the submission file actually exists
exercise = filecheck(exercise)

// execute the solution and submission in parallel with spawn()
exercise = execute(exercise)

// wrap up the child process in a phantom wrapper that can
// mess with the global environment and inspect execution
exercise = wrappedexec(exercise)

exercise.wrapModule(require.resolve('./wrap'))

exercise.addSetup(function (mode, callback) {
  // first arg to child processes

  //wrapped hacked
  this.submissionArgs = [1, 2, 3].concat(this.submissionArgs)
  this.solutionArgs = [1, 2, 3].concat(this.solutionArgs)
  console.log(this.submissionArgs, this.solutionArgs);
  process.nextTick(callback)
})

exercise.addVerifyProcessor(function (callback) {
  this.emit(exercise.wrapData.tapeCalls ? 'pass' : 'fail', 'Used Array#map()')
  callback(null, exercise.wrapData.tapeCalls)
})

module.exports = exercise
