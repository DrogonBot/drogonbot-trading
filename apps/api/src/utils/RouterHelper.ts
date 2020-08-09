import _ from 'lodash';

export class RouterHelper {
  public static checkRequestKeysAllowed = (requestBody, allowedKeys) => {
    const updates = Object.keys(requestBody);
    return updates.every(update => allowedKeys.includes(update));
  };

  // Very similar to the first function, but this one tell us which keys are forbidden (for better error output)
  public static checkForbiddenRequestKeys = (requestBody, allowedKeys): string[] | boolean => {
    const keys = Object.keys(requestBody);

    const forbiddenKeys = _.differenceBy(keys, allowedKeys)

    return forbiddenKeys.length ? forbiddenKeys : false
  };
}


