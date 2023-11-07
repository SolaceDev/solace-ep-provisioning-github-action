# Solace PubSub+ Event Portal Provisioning 

This github action facilitates the provisioning of the designed event driven architecture to the target event broker.

The provisioning logic is defined in https://github.com/TamimiGitHub/solace-terraform-provisioning

# Inputs

- Broker Type: Solace | Confluent 

## The following input variables are required for Confluent provisioning

| Env variable name  | Required/Optional | Description | Default |
| ------------- | ------------- | ------------- | ------------- |
| `SOLACE_CLOUD_TOKEN`  | Required  | Solace Cloud token | NA |
| `TF_VAR_solace_url`  | Required  | Solace Broker URL | NA |
| `TF_VAR_semp_username`  | Required  | Solace Broker SEMP username | NA |
| `TF_VAR_semp_password`  | Required  | Solace Broker SEMP password | NA |
| `SOL_MSG_VPN`  | Required  | Solace Broker message VPN | terraform |
| `SOLACE_MESSAGING_SERVICE`  | Optional  | The target messaging service to provision | The first messaging service in EP |

## The following environment variables are required for Solace provisioning

| Env variable name  | Required/Optional | Description | Default |
| ------------- | ------------- | ------------- | ------------- |
| `SOLACE_CLOUD_TOKEN`  | Required  | Solace Cloud token | NA |
| `TF_VAR_solace_url`  | Required  | Solace Broker URL | NA |
| `TF_VAR_semp_username`  | Required  | Solace Broker SEMP username | NA |
| `TF_VAR_semp_password`  | Required  | Solace Broker SEMP password | NA |
| `SOL_MSG_VPN`  | Required  | Solace Broker message VPN | terraform |
| `SOLACE_MESSAGING_SERVICE`  | Optional  | The target messaging service to provision | The first messaging service in EP |


## Example usage

```yaml
uses: SolaceDev/solace-ep-provisioning-github-action@v1.2
with:
  BROKER_TYPE: solace | confluent
  SOLACE_MESSAGING_SERVICE: ${{ secrets.SOLACE_MESSAGING_SERVICE }}
  SOLACE_CLOUD_TOKEN: ${{ secrets.SOLACE_CLOUD_TOKEN }}
  TF_VAR_confluent_cloud_api_key: ${{ secrets.TF_VAR_confluent_cloud_api_key }}
  TF_VAR_confluent_cloud_api_secret: ${{ secrets.TF_VAR_confluent_cloud_api_secret }}
  AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
  AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```
