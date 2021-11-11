def gv 
pipeline {
     agent any
     stages { 
          stage('init') {
               gv = load 'script.groovy' 
          }
          stage('build') {
            steps {    
             gv.build()
            }     
          }
          stage('deploy') {
               steps {
             gv.deploy() 
               }
          }
     }
}
