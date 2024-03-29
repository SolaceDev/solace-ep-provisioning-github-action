const core = require('@actions/core');
const shell = require('shelljs')

try {
  const BROKER_TYPE = core.getInput('BROKER_TYPE').toLowerCase()
  const APPLICATION_VERSION_ID = core.getInput('APPLICATION_VERSION_ID')
  const PLAN_ONLY = core.getInput('PLAN_ONLY')
  const PROMOTE_ONLY = core.getInput('PROMOTE_ONLY')
  process.env.SOLACE_MESSAGING_SERVICE = core.getInput('SOLACE_MESSAGING_SERVICE');
  process.env.SOLACE_CLOUD_TOKEN =   core.getInput('SOLACE_CLOUD_TOKEN');
  process.env.TF_VAR_confluent_cloud_api_key = core.getInput('TF_VAR_confluent_cloud_api_key');
  process.env.TF_VAR_confluent_cloud_api_secret = core.getInput('TF_VAR_confluent_cloud_api_secret');
  process.env.TF_VAR_solace_url = core.getInput('TF_VAR_solace_url');
  process.env.TF_VAR_semp_username = core.getInput('TF_VAR_semp_username');
  process.env.TF_VAR_semp_password = core.getInput('TF_VAR_semp_password');
  process.env.SOL_MSG_VPN = core.getInput('SOL_MSG_VPN');
  process.env.AWS_ACCESS_KEY_ID = core.getInput('AWS_ACCESS_KEY_ID');
  process.env.AWS_SECRET_ACCESS_KEY = core.getInput('AWS_SECRET_ACCESS_KEY');
  
  if(BROKER_TYPE == "" || process.env.SOLACE_CLOUD_TOKEN == "") {
    throw new Error(`Set the BROKER_TYPE and the SOLACE_CLOUD_TOKEN input variables`)
  }

  switch (BROKER_TYPE) {
    case "solace":
      if (process.env.TF_VAR_solace_url == "" || process.env.TF_VAR_semp_username == "" || process.env.TF_VAR_semp_password == "" || process.env.SOL_MSG_VPN == "") {
        throw new Error(`Set all the following variables:\nTF_VAR_solace_url\nTF_VAR_semp_username\nTF_VAR_semp_password\nSOL_MSG_VPN`)
      }
      break;
    case "confluent":
      if (process.env.TF_VAR_confluent_cloud_api_key == "" || process.env.TF_VAR_confluent_cloud_api_secret == "" || process.env.AWS_ACCESS_KEY_ID == "" || process.env.AWS_SECRET_ACCESS_KEY == undefined) {
        throw new Error(`Set all the following variables:\nTF_VAR_confluent_cloud_api_key\nTF_VAR_confluent_cloud_api_secret\nAWS_ACCESS_KEY_ID\nAWS_SECRET_ACCESS_KEY`)
      }
      break;
    default:
      throw new Error(`Broker Type ${BROKER_TYPE} not supported`);
  }

  shell.exec('git clone https://github.com/TamimiGitHub/solace-terraform-provisioning; cd solace-terraform-provisioning; npm i')

  if(PROMOTE_ONLY != "none") {
    shell.exec(`cd solace-terraform-provisioning; \
    npm run promote -- -appVID ${APPLICATION_VERSION_ID} -mes ${process.env.SOLACE_MESSAGING_SERVICE};`, (code, stderr) => {
      if (code != 0) {
        throw new Error(stderr)
      }
      process.exit(0)
    })
  }

  if(PLAN_ONLY != "none") {
    shell.exec(`cd solace-terraform-provisioning; \
    npm run promote -- -appVID ${APPLICATION_VERSION_ID} -mes ${process.env.SOLACE_MESSAGING_SERVICE}; \
    npm run plan 2>&1 | tee out.txt; \
    npm run promote -- -d -appVID ${APPLICATION_VERSION_ID} -mes ${process.env.SOLACE_MESSAGING_SERVICE}`, (code, stderr) => {
      if (code != 0) {
        throw new Error(stderr)
      }
      let tf_plan = shell.cat("solace-terraform-provisioning/out.txt")
      core.setOutput("tf_plan", tf_plan.stdout);
    })
  } else{
    shell.exec(`cd solace-terraform-provisioning; \
    npm run promote -- -appVID ${APPLICATION_VERSION_ID} -mes ${process.env.SOLACE_MESSAGING_SERVICE};\
    npm run provision`, (code, stderr) => {
      if (code != 0) {
        throw new Error(stderr)
      }
    })
  }
} catch (error) {
  core.setFailed(error.message);
}
