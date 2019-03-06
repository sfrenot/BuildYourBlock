const Wallet = require("./Wallet")

const PUBLIC_KEY_ALICE = `-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqrxMZeGmnZM08Pr8Srbu\nq2ZNAgtOj4mTxKSwOJIVbCkWVkTqFtZsib4FarXSsrqsTQNjhJHAN5W8I6aIIaqS\n5jzWFzHgPYloi6RV7xTL9IBSPcakMGWJTp8ldeJ9kpCSXN0AozlKSCEqGTQdnVRZ\n95UgNVSgDVYtCZjPJanx6asw8E46XTBwj+msMpc855ydz3YGxGyfmPBzbWy3aMzH\nLt9v9nxit7srzRh6lnj42kRZPxH3zpntlOu4ODXXxhhDEwnnz921844uHLby3VRu\nWRys+S2Isz0tKOCtxnh0xxpa0Fa8JrTY8JWDye3iX5ugp/sJQXHSidJLWzmY4RMa\nmQIDAQAB\n-----END PUBLIC KEY-----`;
const PRIVATE_KEY_ALICE = `-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEAqrxMZeGmnZM08Pr8Srbuq2ZNAgtOj4mTxKSwOJIVbCkWVkTq\nFtZsib4FarXSsrqsTQNjhJHAN5W8I6aIIaqS5jzWFzHgPYloi6RV7xTL9IBSPcak\nMGWJTp8ldeJ9kpCSXN0AozlKSCEqGTQdnVRZ95UgNVSgDVYtCZjPJanx6asw8E46\nXTBwj+msMpc855ydz3YGxGyfmPBzbWy3aMzHLt9v9nxit7srzRh6lnj42kRZPxH3\nzpntlOu4ODXXxhhDEwnnz921844uHLby3VRuWRys+S2Isz0tKOCtxnh0xxpa0Fa8\nJrTY8JWDye3iX5ugp/sJQXHSidJLWzmY4RMamQIDAQABAoIBAHCwh9xW65nlp3PG\ntO67fxwyEXHf9KJYs+d+q7Eq+mjBVbTrF3arYEgp23lrOP4up7rNGcpOSQhnFB6T\ntBZEd2Dvln8ItHDpWM+SUAXVPCjM6XtMuOIYol/6OsdsDmXGdlREqj8ReS3Sde7c\nrw9AtYDsNK3+hQVIc8F50n+Rg9ItylZX268A3KBIKKHXvatMBhRuIMPHcsq0ghDk\nwKAuL+70A55tdkq/v8+XaUX54HbujRtjqNOc1hzsKnc39hWwOkQz+V0qh+mAh1od\nvYLFO/Efe8LhbGQ9iz+IqMSC5PevnTMqi/x4s5J5jxlAyHcHCqUP/x6f0wRABp/W\nyo84+YECgYEA/v9D0Z6NQLPzlcvW9EY4D0ouj1pxk0OcABR+J7IO5eftghs30Uox\nrocA11cK5F8cPTY4NXsFB18Dj5dFzfi7WRxPSR6N2gXBjbbiSMQaQInnaWFEdDKD\n81V5WkjYgrwIVf+dEIVmdcvTletc15ympAkIqvd6xkGwUpZJiXOInW0CgYEAq2gy\nmAzTgXodtfIWmTIGYJef4MuDIQ7iFOhNey8OFV/rnewFngVK7hpxoyslsnhSXZjr\niUdhVEeZzf0C5eFmemPrWnXSgQxJnXJY53S7HByZOt4kLBhQZ6BvqEHB+oC+2aqp\nGrWvQcsNxKllzhCnnQ1jsKHANiitS0tSMcP5Ul0CgYEAnJS83VQh4rBdjAdOaFNS\nCzl/G7Hq+gXTHk13JgL1mQFw26rA/Lg1h7kIsDKX0qIAoinQHC79aIhUlHDMgW0S\nBecXXIvxiQZt0wqRKyOYBzdnLVN4CG4YjmxXBzSiFq1F5SEAHmv7/at6sp2DNjbQ\nMPwHIYy0DFe74Qq9/zQ9mIUCgYBQvaFvfEM5L2PFbAb3HNhiMaovAs5/CPq4LIEq\n8Ixqxyc+2Yn/2LBmHnC/ErkMK59o1XrFzKjtQVkS7gaqcJWMO3sGvo9tGHOoxc9Z\nH+Rvpo0LbM6PMtjVJ37RPEB6lqDP+ZL0sPagQFz48W6yNagu07rM3jSjjl+rIwzR\nwmW0RQKBgB+NEmb9aIS+4xpNzpbCFtDAqQ4Y095ubXOjklBLz4mhtlL5a9kVr8FR\nBNYfBG/A1UOCzoi462wwYRZooMIdOGzGqea64VfaxOdu4Gds0GAKhLYUZkrjG+mJ\nptK3iCr990g4yqQyWNDvXqrdz3BrhsLJrdwYooX+iU2VHxj+dKKP\n-----END RSA PRIVATE KEY-----`;

const PUBLIC_KEY_BOB = `-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArbX5jfQLS3wdbJluVriF\nwB2Yuphqc+rO4FZJ5dj26urKs/fEgsknv2ccI6dS23yZ5mekx8puaGrVS5ib8Rg0\nfH9rhylNxj5CJw/vEEEmyilbfrnU5wtcPgiYeBKaG6XdSRCBBOMkQND5A9uPp3Hz\nOSKZLB16ybs0N5vrfxcKXQyMIw38cvVIAOIGdXwH2O2CD8QChOYX1VCiwHXQUrRB\n0ZzJGf5NOxXVKJpohK4MT8nu+QhR6YEdHMfCPPKtjFrAE8fO0WAFewownHe++xKx\n4yXIY8eoHY/Fy8lljRgWzfqpLC1K6EQzVrH26bvrkQ0oLb4hrEx9MxPLemNxyI24\nSQIDAQAB\n-----END PUBLIC KEY-----`;
const PRIVATE_KEY_BOB = `-----BEGIN RSA PRIVATE KEY-----\nMIIEpQIBAAKCAQEArbX5jfQLS3wdbJluVriFwB2Yuphqc+rO4FZJ5dj26urKs/fE\ngsknv2ccI6dS23yZ5mekx8puaGrVS5ib8Rg0fH9rhylNxj5CJw/vEEEmyilbfrnU\n5wtcPgiYeBKaG6XdSRCBBOMkQND5A9uPp3HzOSKZLB16ybs0N5vrfxcKXQyMIw38\ncvVIAOIGdXwH2O2CD8QChOYX1VCiwHXQUrRB0ZzJGf5NOxXVKJpohK4MT8nu+QhR\n6YEdHMfCPPKtjFrAE8fO0WAFewownHe++xKx4yXIY8eoHY/Fy8lljRgWzfqpLC1K\n6EQzVrH26bvrkQ0oLb4hrEx9MxPLemNxyI24SQIDAQABAoIBAQCMgSFeOWQdZUGj\ngqLl0BCXKRlM7FVGd0ln2UOifxCRSOI2GRVAuBXHUk5HZGK3l5wf6fs1gr41BRyL\nLeAMbYienq3JwJXg4KC/WbsDSb9nS3ZvFT5otx6gKnGwxVMTQ+Ct5YSGAHdlWeHg\nxen3BUs3Do4YSav0mdANnrcnr+o5AcC9P3pFQkoiHjy67JC/uAgokuR6oeahAkqj\ntqZQlBS2UmPR9+/9huTFXX56LwbE3ClbHAI5g57Q8dH92vWJf4AFjyP4XWdCxPfV\n0jxUEkGFqM2q3vcicJ2+Hj3tVlmUBDX+eHFqEqvqlYFmL9XxSyS37Rj1pTHNpa+n\nOuAMyLbRAoGBAPbyAIlss6lSsQXVIYR0gj/GyOfu1Gz0y0UciQsGXVW/sBvbAQAK\nBoRs9L/erzv+ObvL4Ku9HWaDTRhb2cNKfrpnIQaaY3D5Gk9fn0yBBBf88QsJII/p\nhDDEadZq1hIDZok4NK0VzShfaWGTiV8KL3djZn7hEeR8rRwaP0KUp+0FAoGBALQU\nizGkEVa4izYBLlS4SW9DTSFjZIJb697uokIbeCCiwIB3ZwkyXAdIKUALvPI7IZZG\nEpnijJjcxLyb8OWjX7du/AhJ1XgHJ3BVOA7sNfjeguHRQkqF+0SFCdF7UdwFIEXm\nHlCqZ60DoVPxl0ZCRieT+qCuChkMhVhjrcCfGeF1AoGBANmeZm60xpce8jWrnv/1\nFJtTeNU7mSPzjfZ3sSVwFGxuoqnJk9YO/7NPuVgky9RYs1QV1QZDgFdIunYO65a4\nXXmzTF1fTObP/ymXoPBwecUR+PG6t2Fbbkzzqjl0qPXy3TdrurAVmFhNzLZaqCKC\n/VV+2WJSwcvTO1Kapsjr7BhpAoGBAJROzwxFCRqYxd3mPxf65k/B58X1q5NIzQs/\nEVbMdLS8FTo4HB2Q4gYFQiPDBwuf81tlvnAKCqziNQz4iP82+9+AggT5edtuWObE\n6HQxyYl7B+OeibAChBu8TYe+vn4ropaunIzmqpftA3K051cvwcNatfCbJSnYDAHt\npe2bmp75AoGAMkFL2mO9tiGyYfuw8GnARvI9lShB1sXRkv93xWclnyYgpbjXlrOM\n1zkXX5+bXToooZLCbwrtndceVFJMbfH/wOM9HBWjQdcWdMJwAt0yl6GbwZ3MggCt\nD5Lkv/sxWLvbFRGVh9nvSAkTpilIxWsIcFvGLk/Q8mEBmjAGltDqBIk=\n-----END RSA PRIVATE KEY-----`;

const walletA = new Wallet(PRIVATE_KEY_ALICE);
const walletB = new Wallet(PRIVATE_KEY_BOB);
const walletC = new Wallet(); // Crée un nouveau Wallet avec une clé aléatoire

// on construit un wallet depuis la clé publique
const walletAPublic = new Wallet(PUBLIC_KEY_ALICE);

console.log("Je dois avoir la clé privée de Alice :", walletA.hasPrivate());
console.log("Pour Bob aussi :", walletA.hasPrivate());
console.log("Et Charlie :", walletC.hasPrivate());
console.log("Mais pas pour Alain :", walletAPublic.hasPrivate());

console.log("Et la clé publique de Alice doit être la bonne :", walletA.getPublicKey() === PUBLIC_KEY_ALICE);
console.log("Et celle de Alain aussi :", walletAPublic.getPublicKey() === PUBLIC_KEY_ALICE);

const text = 'Hello RSA!';

const signatureA = walletA.sign(text);
console.log('Signature Alice : ', signatureA);
const verifyA = walletA.verify(text, signatureA);
console.log('Verify Alice : ', verifyA);

const signatureB = walletB.sign(text);
console.log('Signature Bob : ', signatureB);
const verifyB = walletB.verify(text, signatureB);
console.log('Verify Bob : ', verifyB);

// Uniquement avec la clé publique de Alice,
// je peux vérifier que c'est bien Alice qui a signé avec sa clé privée
const verifyAByAPublic = walletAPublic.verify(text, signatureA);
console.log('verify Alice by Alain : ', verifyAByAPublic);
