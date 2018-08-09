### bumped to version v0.0.13 (HEAD -> release-v0.0.13)

>Author: Chris Blazek (chris.blazek@gmail.com)

>Author Date: Thu, 9 Aug 2018 10:49:06 -0500

>Commiter: Chris Blazek (chris.blazek@gmail.com)

>Commit Date: Thu, 9 Aug 2018 10:49:06 -0500

>Commit: 65e9be6d29b729273cf2c58c1d44232b30cbefb4 




### CHANGELOG.md (v0.0.13)

>Author: Chris Blazek (chris.blazek@gmail.com)

>Author Date: Thu, 9 Aug 2018 10:42:26 -0500

>Commiter: Chris Blazek (chris.blazek@gmail.com)

>Commit Date: Thu, 9 Aug 2018 10:42:26 -0500

>Commit: dfee1d383366090aafd4abbe50c0c8e3187abc7e 




### updating vulnerable packages

>Author: Chris Blazek (chris.blazek@gmail.com)

>Author Date: Thu, 9 Aug 2018 10:42:14 -0500

>Commiter: Chris Blazek (chris.blazek@gmail.com)

>Commit Date: Thu, 9 Aug 2018 10:42:14 -0500

>Commit: 2a737c2b9e4a64e422a3fb36d3f589473b8fe884 




### Prepared to release 0.0.12. (tag: v0.0.12, origin/master, origin/HEAD, master)

>Author: Stephen Yeargin (stephen.yeargin@gmail.com)

>Author Date: Sat, 30 Dec 2017 18:41:37 -0600

>Commiter: Stephen Yeargin (stephen.yeargin@gmail.com)

>Commit Date: Sat, 30 Dec 2017 18:41:37 -0600

>Commit: 5f186c10a8f8f000794acffd592519c7d9aedcfe 




### Update package-lock.json on Grunt release

>Author: Stephen Yeargin (stephen.yeargin@gmail.com)

>Author Date: Fri, 29 Dec 2017 09:06:12 -0600

>Commiter: Stephen Yeargin (stephen.yeargin@gmail.com)

>Commit Date: Fri, 29 Dec 2017 09:06:12 -0600

>Commit: c63b83a62410b6fc36f778c3067587d05ec439da 

The `package-lock.json` version file was not being updated when the
package was released via the automated Grunt script. This adds it to the
`additionalFiles` directive which will find the `version` property and
match it with the one in `package.json`.

Usage:

```
$ grunt release:<major|minor|patch>
```



### Prepared to release 0.0.11. (tag: v0.0.11)

>Author: Stephen Yeargin (stephen.yeargin@gmail.com)

>Author Date: Fri, 29 Dec 2017 09:00:00 -0600

>Commiter: Stephen Yeargin (stephen.yeargin@gmail.com)

>Commit Date: Fri, 29 Dec 2017 09:00:00 -0600

>Commit: 48e27a433e4f8d6b299e0894c4f1eb94b3a752c6 




### Missed test for single light on/off

>Author: Stephen Yeargin (stephen.yeargin@gmail.com)

>Author Date: Wed, 27 Dec 2017 10:18:49 -0600

>Commiter: Stephen Yeargin (stephen.yeargin@gmail.com)

>Commit Date: Wed, 27 Dec 2017 10:18:49 -0600

>Commit: 3f8aeda91651b52be59b68f2c32d0e14442d227f 




### Remove old hue hash notation. [skip ci]

>Author: Stephen Yeargin (stephen.yeargin@gmail.com)

>Author Date: Wed, 27 Dec 2017 09:59:56 -0600

>Commiter: Stephen Yeargin (stephen.yeargin@gmail.com)

>Commit Date: Wed, 27 Dec 2017 10:00:41 -0600

>Commit: 92684be7053c18261f4f8a04321494d7dafc7606 




### Improve test suite

>Author: Stephen Yeargin (stephen.yeargin@gmail.com)

>Author Date: Tue, 26 Dec 2017 16:10:10 -0600

>Commiter: Stephen Yeargin (stephen.yeargin@gmail.com)

>Commit Date: Wed, 27 Dec 2017 09:55:40 -0600

>Commit: cc4fd10a67bdfb366c0499fb8219ad7f88f06457 

- Runs the test suite against the API endpoints rather than simply checking for a listener
- Fixes a few small bugs found while running the test suite (ID in place of group name, etc.)
- Updates README



### changelog.md

>Author: Chris Blazek (chris.blazek@gmail.com)

>Author Date: Tue, 26 Dec 2017 22:29:38 -0600

>Commiter: Chris Blazek (chris.blazek@gmail.com)

>Commit Date: Tue, 26 Dec 2017 22:29:38 -0600

>Commit: 57cf28480cbf4f6fea221e7344ce18b3fed6a684 




### version bump to fix the security warning and push to npm

>Author: Chris Blazek (chris.blazek@gmail.com)

>Author Date: Tue, 26 Dec 2017 22:27:41 -0600

>Commiter: Chris Blazek (chris.blazek@gmail.com)

>Commit Date: Tue, 26 Dec 2017 22:27:41 -0600

>Commit: 5e8f4b4b77d3bfdf8ba1210f662e6bf1d160d78d 




### Remove programattic link button push

>Author: Stephen Yeargin (stephen.yeargin@gmail.com)

>Author Date: Sun, 24 Dec 2017 19:01:00 -0600

>Commiter: Stephen Yeargin (stephen.yeargin@gmail.com)

>Commit Date: Sun, 24 Dec 2017 19:02:39 -0600

>Commit: 9671ffeddbbd64274a2fb186f5325270e47e626d 

The `/info` API was deprecated in a software update, so the feature no
longe works.



### Add a commands to allow the `colorloop` effect

>Author: Stephen Yeargin (stephen.yeargin@gmail.com)

>Author Date: Wed, 27 Jan 2016 00:06:24 -0600

>Commiter: Stephen Yeargin (stephen.yeargin@gmail.com)

>Commit Date: Wed, 27 Jan 2016 00:06:24 -0600

>Commit: 0015b9c0311e8534722718a7dc03dac640d7bb53 

The API has a feature that allows the hub to send a sequence of colors (with transitions) to the bulbs that support it. This PR allows a user to invoke this effect on or off for a particular light.

```
User> hubot hue colorloop on light 1
Hubot> Setting light 1 colorloop to on

[..]

User> hubot hue colorloop off light 1
Hubot> Setting light 1 colorloop to off
```



### Update README to reflect Whitelist policy change

>Author: Stephen Yeargin (stephen.yeargin@gmail.com)

>Author Date: Wed, 9 Dec 2015 20:29:35 -0600

>Commiter: Stephen Yeargin (stephen.yeargin@gmail.com)

>Commit Date: Wed, 9 Dec 2015 20:29:35 -0600

>Commit: 0cab78dadd5f540b652f670c7ef51e98331723e0 

I came across [an issue](https://github.com/peter-murray/node-hue-api/issues/63) created by @SteveyO in the `node-hue-api` project and realized that the instructions for this script package needed to be updated to reflect those changes. I also did some other formatting/restructuring while I was in there to make it easier to follow along with.

Reference: http://www.developers.meethue.com/documentation/important-whitelist-changes



### 0.0.9

>Author: Chris Blazek (cblazek@armt.com)

>Author Date: Thu, 23 Jul 2015 09:10:47 -0500

>Commiter: Chris Blazek (cblazek@armt.com)

>Commit Date: Thu, 23 Jul 2015 09:10:47 -0500

>Commit: 14549be76fca09b753172135e6c1b7dbc79dc763 




### credits

>Author: Chris Blazek (chris.blazek@gmail.com)

>Author Date: Thu, 23 Jul 2015 09:02:02 -0500

>Commiter: Chris Blazek (chris.blazek@gmail.com)

>Commit Date: Thu, 23 Jul 2015 09:02:02 -0500

>Commit: eeaa69ae81a4cef01b27b1b6375757debe97b3ba 

Giving credit where credit is due.


### Fix Travis-CI badge in README.md

>Author: Stephen Yeargin (stephenyeargin@users.noreply.github.com)

>Author Date: Tue, 7 Jul 2015 01:20:35 -0500

>Commiter: Stephen Yeargin (stephenyeargin@users.noreply.github.com)

>Commit Date: Tue, 7 Jul 2015 01:20:35 -0500

>Commit: a6a0885d029c11c31d3e5a6d7d71e11443759975 

The example badge that was previously linked was inaccurate. The link attached to the badge was correct.


### Format the code blocks.

>Author: Stephen Yeargin (stephen.yeargin@gmail.com)

>Author Date: Wed, 27 May 2015 22:19:33 -0500

>Commiter: Stephen Yeargin (stephen.yeargin@gmail.com)

>Commit Date: Wed, 27 May 2015 22:19:33 -0500

>Commit: f2fb73e2f4c55f8dddc6f39d8551664d8a77e99c 




### Fix typo

>Author: Stephen Yeargin (stephenyeargin@users.noreply.github.com)

>Author Date: Mon, 25 May 2015 20:00:18 -0500

>Commiter: Stephen Yeargin (stephenyeargin@users.noreply.github.com)

>Commit Date: Mon, 25 May 2015 20:00:18 -0500

>Commit: e77398e0d11dfef629017ce52c39ee8475a143e4 




### Refactor to use `node-hue-api`

>Author: Stephen Yeargin (stephen.yeargin@gmail.com)

>Author Date: Mon, 25 May 2015 17:12:02 -0500

>Commiter: Stephen Yeargin (stephen.yeargin@gmail.com)

>Commit Date: Mon, 25 May 2015 17:12:02 -0500

>Commit: e0acab8751d9df032559a5e7a4da36e4473f773a 

- Refactors to use [`node-hue-api`](https://github.com/peter-murray/node-hue-api) package for simplified calls
- Adds test coverage to all registered listeners
- Improves output from scripts to no longer spit out raw JSON
- Makes it slightly more polite :grin:

Tested with Slack adapter and a hue starter kit.

Fixes #1 by virtue of reducing backtalk to meaningful stuff.



### wrong version

>Author: kingbin (chris.blazek@gmail.com)

>Author Date: Sun, 31 Aug 2014 23:10:47 -0500

>Commiter: kingbin (chris.blazek@gmail.com)

>Commit Date: Sun, 31 Aug 2014 23:10:47 -0500

>Commit: ceacd115862ec02fa65ccb93268b613b5ff2a2b3 




### fixed test framework issue preventing a passing travis build

>Author: kingbin (chris.blazek@gmail.com)

>Author Date: Sun, 31 Aug 2014 22:53:14 -0500

>Commiter: kingbin (chris.blazek@gmail.com)

>Commit Date: Sun, 31 Aug 2014 22:53:14 -0500

>Commit: eda49f99bc3f270b2cb0315260b8b26018cc4be4 




### Fix help text

>Author: Bryan M. Schlief (bryans@darkhorse.com)

>Author Date: Wed, 23 Jul 2014 23:45:25 -0700

>Commiter: Bryan M. Schlief (bryans@darkhorse.com)

>Commit Date: Wed, 23 Jul 2014 23:45:25 -0700

>Commit: 595e5a99112cd2ace9adb000960bb846c7a41b69 




### Add fake groups and @<group name> notation

>Author: Bryan M. Schlief (bryans@darkhorse.com)

>Author Date: Tue, 15 Jul 2014 21:05:15 -0700

>Commiter: Bryan M. Schlief (bryans@darkhorse.com)

>Commit Date: Wed, 23 Jul 2014 23:33:52 -0700

>Commit: 5fc91193b1b1c0b290e42c7bdbe74071760fe00b 




### Add three commands to control colors

>Author: Bryan M. Schlief (bryans@darkhorse.com)

>Author Date: Sat, 12 Jul 2014 12:26:36 -0700

>Commiter: Bryan M. Schlief (bryans@darkhorse.com)

>Commit Date: Sat, 12 Jul 2014 12:26:36 -0700

>Commit: 344f40068820476687815b0531bc40567b7072be 

hsb - hue, saturation, brightness mode
xy - cie color mode
ct - color temperature mode



### clarice

>Author: Chris Blazek (chris.blazek@gmail.com)

>Author Date: Fri, 15 Nov 2013 11:36:27 -0600

>Commiter: Chris Blazek (chris.blazek@gmail.com)

>Commit Date: Fri, 15 Nov 2013 11:36:27 -0600

>Commit: 653124fa2f4b8754cf91b15570f8b93aab8e2d36 




### adding clarity to the setup process

>Author: Chris Blazek (chris.blazek@gmail.com)

>Author Date: Fri, 15 Nov 2013 11:35:19 -0600

>Commiter: Chris Blazek (chris.blazek@gmail.com)

>Commit Date: Fri, 15 Nov 2013 11:35:19 -0600

>Commit: 1b506990778d2515c801d6274bc9aef3c955ed7f 




### playing with tavis & npm settings

>Author: kingbin (chris.blazek@gmail.com)

>Author Date: Tue, 5 Nov 2013 20:40:34 -0600

>Commiter: kingbin (chris.blazek@gmail.com)

>Commit Date: Tue, 5 Nov 2013 20:40:34 -0600

>Commit: 113f583fb5e7b6d4a05c013eca2ff90b72909cce 




### 0.0.6

>Author: kingbin (chris.blazek@gmail.com)

>Author Date: Tue, 5 Nov 2013 20:35:03 -0600

>Commiter: kingbin (chris.blazek@gmail.com)

>Commit Date: Tue, 5 Nov 2013 20:35:03 -0600

>Commit: 026939cecb0a836cf175b7685129400f35a9810b 




### npm automation

>Author: kingbin (chris.blazek@gmail.com)

>Author Date: Tue, 5 Nov 2013 20:26:25 -0600

>Commiter: kingbin (chris.blazek@gmail.com)

>Commit Date: Tue, 5 Nov 2013 20:26:25 -0600

>Commit: d7ea05f5b3b4d4580087f5fa5fec16a3c995a758 




### setting up npm automation deployment

>Author: kingbin (chris.blazek@gmail.com)

>Author Date: Tue, 5 Nov 2013 20:14:34 -0600

>Commiter: kingbin (chris.blazek@gmail.com)

>Commit Date: Tue, 5 Nov 2013 20:14:34 -0600

>Commit: 95d4dbb9f9d7c856035ba0107be313ceca412b99 




### ver bump

>Author: kingbin (chris.blazek@gmail.com)

>Author Date: Sun, 3 Nov 2013 16:43:46 -0600

>Commiter: kingbin (chris.blazek@gmail.com)

>Commit Date: Sun, 3 Nov 2013 16:43:46 -0600

>Commit: 5967366e6177d624e17ecc8a661d4a93e50013cb 




### philips hue header help update

>Author: kingbin (chris.blazek@gmail.com)

>Author Date: Sun, 3 Nov 2013 16:43:16 -0600

>Commiter: kingbin (chris.blazek@gmail.com)

>Commit Date: Sun, 3 Nov 2013 16:43:16 -0600

>Commit: 099210b88bc7112ee7740fd2eb2fee26944ad53d 




### ver bump

>Author: kingbin (chris.blazek@gmail.com)

>Author Date: Sun, 3 Nov 2013 16:28:02 -0600

>Commiter: kingbin (chris.blazek@gmail.com)

>Commit Date: Sun, 3 Nov 2013 16:28:02 -0600

>Commit: a71fe37b8364c2ca2b5cbdf153c8cfbe491bffdb 




### readme installation addition

>Author: kingbin (chris.blazek@gmail.com)

>Author Date: Sun, 3 Nov 2013 16:27:05 -0600

>Commiter: kingbin (chris.blazek@gmail.com)

>Commit Date: Sun, 3 Nov 2013 16:27:05 -0600

>Commit: 430d6299c8c711f4f02b772fb3a12dc42d1ce51a 




### travis readme tag

>Author: kingbin (chris.blazek@gmail.com)

>Author Date: Sun, 3 Nov 2013 16:20:45 -0600

>Commiter: kingbin (chris.blazek@gmail.com)

>Commit Date: Sun, 3 Nov 2013 16:20:45 -0600

>Commit: 255a6253650b2051933e4294880be81dfc58ca94 




### travis build

>Author: kingbin (chris.blazek@gmail.com)

>Author Date: Sun, 3 Nov 2013 16:19:15 -0600

>Commiter: kingbin (chris.blazek@gmail.com)

>Commit Date: Sun, 3 Nov 2013 16:19:15 -0600

>Commit: 3bae4197decdb2918cb9c0105cabc1896a9fb451 




### ver bump

>Author: kingbin (chris.blazek@gmail.com)

>Author Date: Sun, 3 Nov 2013 16:13:37 -0600

>Commiter: kingbin (chris.blazek@gmail.com)

>Commit Date: Sun, 3 Nov 2013 16:13:37 -0600

>Commit: b357ab69302af145d8c5a0ba37dc0a372158c0ba 




### tweaks

>Author: kingbin (chris.blazek@gmail.com)

>Author Date: Sun, 3 Nov 2013 16:09:57 -0600

>Commiter: kingbin (chris.blazek@gmail.com)

>Commit Date: Sun, 3 Nov 2013 16:09:57 -0600

>Commit: 46a10eeacee77d9bc589b447744853a172e815be 




### ver bump and syntax error

>Author: kingbin (chris.blazek@gmail.com)

>Author Date: Sun, 3 Nov 2013 15:43:10 -0600

>Commiter: kingbin (chris.blazek@gmail.com)

>Commit Date: Sun, 3 Nov 2013 15:43:10 -0600

>Commit: 32198924ecc4eaea7871011326ddbdf1e4931963 




### moving to suggested hubot-example script

>Author: kingbin (chris.blazek@gmail.com)

>Author Date: Sun, 3 Nov 2013 15:23:02 -0600

>Commiter: kingbin (chris.blazek@gmail.com)

>Commit Date: Sun, 3 Nov 2013 15:23:02 -0600

>Commit: feb440b7e9123dc4512d9f817c53a3d4c20a4870 




### moving to suggested hubot-example script

>Author: kingbin (chris.blazek@gmail.com)

>Author Date: Sun, 3 Nov 2013 15:22:28 -0600

>Commiter: kingbin (chris.blazek@gmail.com)

>Commit Date: Sun, 3 Nov 2013 15:22:28 -0600

>Commit: e3fd7252ab429944bc3d8c2c12b071b8b3ddc360 




### tiny tweak on script command and command update

>Author: kingbin (chris.blazek@gmail.com)

>Author Date: Sun, 3 Nov 2013 14:40:16 -0600

>Commiter: kingbin (chris.blazek@gmail.com)

>Commit Date: Sun, 3 Nov 2013 14:40:16 -0600

>Commit: 50eb83ae9e45059c29ad1cf1cb55c1f88320e69f 




### first commit

>Author: kingbin (chris.blazek@gmail.com)

>Author Date: Sun, 3 Nov 2013 14:39:00 -0600

>Commiter: kingbin (chris.blazek@gmail.com)

>Commit Date: Sun, 3 Nov 2013 14:39:00 -0600

>Commit: 636336b2c0945fd3e01f9a4f734f0ef81f04b350 




