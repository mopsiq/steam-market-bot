import {
  EAuthSessionGuardType,
  EAuthTokenPlatformType,
  LoginSession,
  EResult,
} from "steam-session";

interface ISteamSession {
  accountName: string;
  password: string;
}

export async function steamAuthorization({
  accountName,
  password,
}: ISteamSession) {
  // Create our LoginSession and start a login session using our credentials. This session will be for a client login.
  let session = new LoginSession(EAuthTokenPlatformType.SteamClient);
  let startResult: any = await session.startWithCredentials({
    accountName,
    password,
  });

  // actionRequired will be true if we need to do something to finish logging in, e.g. supply a code or approve a
  // prompt on our phone.
  if (startResult.actionRequired) {
    console.log("Action is required from you to complete this login");

    // We want to process the non-prompting guard types first, since the last thing we want to do is prompt the
    // user for input. It would be needlessly confusing to prompt for input, then print more text to the console.
    let promptingGuardTypes = [
      EAuthSessionGuardType.EmailCode,
      EAuthSessionGuardType.DeviceCode,
    ];
    let promptingGuards = startResult.validActions.filter((action: any) =>
      promptingGuardTypes.includes(action.type)
    );
    let nonPromptingGuards = startResult.validActions.filter(
      (action: any) => !promptingGuardTypes.includes(action.type)
    );

    let printGuard = async ({ type, detail }: any) => {
      let code;

      try {
        switch (type) {
          case EAuthSessionGuardType.EmailCode:
            console.log(
              `A login code has been sent to your email address at ${detail}`
            );
            // code = await promptAsync("Code: ");
            if (code) {
              await session.submitSteamGuardCode(code);
            }
            break;

          case EAuthSessionGuardType.DeviceCode:
            console.log(
              "You may confirm this login by providing a Steam Guard Mobile Authenticator code"
            );
            // code = await promptAsync("Code: ");
            if (code) {
              await session.submitSteamGuardCode(code);
            }
            break;

          case EAuthSessionGuardType.EmailConfirmation:
            console.log("You may confirm this login by email");
            break;

          case EAuthSessionGuardType.DeviceConfirmation:
            console.log(
              "You may confirm this login by responding to the prompt in your Steam mobile app"
            );
            break;
        }
      } catch (ex: any) {
        if (ex.eresult == EResult.TwoFactorCodeMismatch) {
          console.log("Incorrect Steam Guard code");
          printGuard({ type, detail });
        } else {
          throw ex;
        }
      }
    };

    nonPromptingGuards.forEach(printGuard);
    promptingGuards.forEach(printGuard);
  }

  return new Promise((resolve, reject) => {
    session.on("steamGuardMachineToken", () => {
      console.log("\nReceived new Steam Guard machine token");
      console.log(`Machine Token: ${session.steamGuardMachineToken}`);
    });

    session.on("authenticated", async () => {
      let webCookies = await session.getWebCookies();
      console.log("Web session cookies:");
      console.log(webCookies);

      resolve(webCookies);
    });

    session.on("timeout", () => {
      console.log("This login attempt has timed out.");
      reject("This login attempt has timed out.");
    });

    session.on("error", (err) => {
      // This should ordinarily not happen. This only happens in case there's some kind of unexpected error while
      // polling, e.g. the network connection goes down or Steam chokes on something.
      console.log(`ERROR: This login attempt has failed! ${err.message}`);
      reject(err);
    });
  }).then((cookies) =>
    (cookies as string[]).find((i) => i.includes("steamLoginSecure"))
  );
}
