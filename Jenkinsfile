pipeline {
     agent any
     environment {
          NEW_VERSION = '1.3.0'
          
     }
     
     stages { 
          stage('build') {
            steps {
                 echo "the current branch is ${env.BRANCH_NAME}"
                 echo "Building with version ${NEW_VERSION}"
            }     
          }
          stage('test') {
               steps {
                    echo 'testing the app'
               }
          }
          stage('deploy') {
               steps {
                    echo 'deploying the app'
               }
          }
     }
}
