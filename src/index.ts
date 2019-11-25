import fetch from 'node-fetch';

export class CredentialManager {
  public static login(email: string, password: string, url?: string | undefined): Promise<CredentialManager> {
    const bodyMsg = {
      email: email,
      password: password,
    };
    return new Promise((resolve, reject) => {
      url = (url===undefined?'http://localhost:3000':url)
      fetch(url + '/users/authenticate', {
        body: JSON.stringify(bodyMsg),
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        method: 'POST',
      })
        .then(response => response.json())
        .then(json => {
          // console.log(json['accessToken'])
          const credentialManager = new CredentialManager();
          credentialManager.accessToken = json[`accessToken`];
          resolve(credentialManager);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  private accessToken: string | undefined;

  get token() {
    return this.accessToken;
  }
  set token(accessToken) {
    this.accessToken = accessToken;
  }
}
