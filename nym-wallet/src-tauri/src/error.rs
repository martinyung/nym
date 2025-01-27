use serde::{Serialize, Serializer};
use thiserror::Error;
use validator_client::nymd::error::NymdError;
use validator_client::validator_api::error::ValidatorAPIError;

#[derive(Error, Debug)]
pub enum BackendError {
  #[error("{source}")]
  Bip39Error {
    #[from]
    source: bip39::Error,
  },
  #[error("{source}")]
  TendermintError {
    #[from]
    source: tendermint_rpc::Error,
  },
  #[error("{source}")]
  NymdError {
    #[from]
    source: NymdError,
  },
  #[error("{source}")]
  CosmwasmStd {
    #[from]
    source: cosmwasm_std::StdError,
  },
  #[error("{source}")]
  ErrorReport {
    #[from]
    source: eyre::Report,
  },
  #[error("{source}")]
  ValidatorApiError {
    #[from]
    source: ValidatorAPIError,
  },
  #[error("Client has not been initialized yet, connect with mnemonic to initialize")]
  ClientNotInitialized,
  #[error("No balance available for address {0}")]
  NoBalance(String),
  #[error("{0} is not a valid denomination string")]
  InvalidDenom(String),
  #[error("The provided network is not supported (yet)")]
  NetworkNotSupported(config::defaults::all::Network),
}

impl Serialize for BackendError {
  fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
  where
    S: Serializer,
  {
    serializer.serialize_str(&self.to_string())
  }
}
