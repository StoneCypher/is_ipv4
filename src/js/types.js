
// @flow

type Result = {| result: false, reason: string |} | {| result: true |};
type Ip     = number | string; // should have IpPartial too

export type { Result, Ip };
