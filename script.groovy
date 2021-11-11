def build()
{
  withCredentials([usernamePassword(credentialsId: 'dockerhub' , usernameVariable: USER , passwordVariable: PASS)]){
                    echo "Building the docker image from Dockerfile"
                    sh "docker build -t chedihammami/demo:2.0 ."
                    sh "echo ${PASS} | docker login -u ${USER} --password-stdin" 
                    sh "docker push chedihammami/demo:2.0"    
                  } 
}
def deploy()
{
  echo "deploying application" 
}
return this
