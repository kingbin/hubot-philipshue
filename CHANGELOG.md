### changelog.md (HEAD -> production)
>Tue, 26 Dec 2017 22:29:38 -0600

>Author: Chris Blazek (chris.blazek@gmail.com)

>Commiter: Chris Blazek (chris.blazek@gmail.com)




### Remove programattic link button push
>Sun, 24 Dec 2017 19:01:00 -0600

>Author: Stephen Yeargin (stephen.yeargin@gmail.com)

>Commiter: Stephen Yeargin (stephen.yeargin@gmail.com)

The `/info` API was deprecated in a software update, so the feature no
longe works.



### Add a commands to allow the `colorloop` effect
>Wed, 27 Jan 2016 00:06:24 -0600

>Author: Stephen Yeargin (stephen.yeargin@gmail.com)

>Commiter: Stephen Yeargin (stephen.yeargin@gmail.com)

The API has a feature that allows the hub to send a sequence of colors (with transitions) to the bulbs that support it. This PR allows a user to invoke this effect on or off for a particular light.

```
User> hubot hue colorloop on light 1
Hubot> Setting light 1 colorloop to on

[..]

User> hubot hue colorloop off light 1
Hubot> Setting light 1 colorloop to off
```



### Update README to reflect Whitelist policy change
>Wed, 9 Dec 2015 20:29:35 -0600

>Author: Stephen Yeargin (stephen.yeargin@gmail.com)

>Commiter: Stephen Yeargin (stephen.yeargin@gmail.com)

I came across [an issue](https://github.com/peter-murray/node-hue-api/issues/63) created by @SteveyO in the `node-hue-api` project and realized that the instructions for this script package needed to be updated to reflect those changes. I also did some other formatting/restructuring while I was in there to make it easier to follow along with.

Reference: http://www.developers.meethue.com/documentation/important-whitelist-changes



### 0.0.9
>Thu, 23 Jul 2015 09:10:47 -0500

>Author: Chris Blazek (cblazek@armt.com)

>Commiter: Chris Blazek (cblazek@armt.com)




### credits
>Thu, 23 Jul 2015 09:02:02 -0500

>Author: Chris Blazek (chris.blazek@gmail.com)

>Commiter: Chris Blazek (chris.blazek@gmail.com)

Giving credit where credit is due.


### Fix Travis-CI badge in README.md
>Tue, 7 Jul 2015 01:20:35 -0500

>Author: Stephen Yeargin (stephenyeargin@users.noreply.github.com)

>Commiter: Stephen Yeargin (stephenyeargin@users.noreply.github.com)

The example badge that was previously linked was inaccurate. The link attached to the badge was correct.


### Format the code blocks.
>Wed, 27 May 2015 22:19:33 -0500

>Author: Stephen Yeargin (stephen.yeargin@gmail.com)

>Commiter: Stephen Yeargin (stephen.yeargin@gmail.com)




### Fix typo
>Mon, 25 May 2015 20:00:18 -0500

>Author: Stephen Yeargin (stephenyeargin@users.noreply.github.com)

>Commiter: Stephen Yeargin (stephenyeargin@users.noreply.github.com)




### Refactor to use `node-hue-api`
>Mon, 25 May 2015 17:12:02 -0500

>Author: Stephen Yeargin (stephen.yeargin@gmail.com)

>Commiter: Stephen Yeargin (stephen.yeargin@gmail.com)

- Refactors to use [`node-hue-api`](https://github.com/peter-murray/node-hue-api) package for simplified calls
- Adds test coverage to all registered listeners
- Improves output from scripts to no longer spit out raw JSON
- Makes it slightly more polite :grin:

Tested with Slack adapter and a hue starter kit.

Fixes #1 by virtue of reducing backtalk to meaningful stuff.



### wrong version
>Sun, 31 Aug 2014 23:10:47 -0500

>Author: kingbin (chris.blazek@gmail.com)

>Commiter: kingbin (chris.blazek@gmail.com)




### fixed test framework issue preventing a passing travis build
>Sun, 31 Aug 2014 22:53:14 -0500

>Author: kingbin (chris.blazek@gmail.com)

>Commiter: kingbin (chris.blazek@gmail.com)




### Fix help text
>Wed, 23 Jul 2014 23:45:25 -0700

>Author: Bryan M. Schlief (bryans@darkhorse.com)

>Commiter: Bryan M. Schlief (bryans@darkhorse.com)




### Add fake groups and @<group name> notation
>Tue, 15 Jul 2014 21:05:15 -0700

>Author: Bryan M. Schlief (bryans@darkhorse.com)

>Commiter: Bryan M. Schlief (bryans@darkhorse.com)




### Add three commands to control colors
>Sat, 12 Jul 2014 12:26:36 -0700

>Author: Bryan M. Schlief (bryans@darkhorse.com)

>Commiter: Bryan M. Schlief (bryans@darkhorse.com)

hsb - hue, saturation, brightness mode
xy - cie color mode
ct - color temperature mode



### clarice
>Fri, 15 Nov 2013 11:36:27 -0600

>Author: Chris Blazek (chris.blazek@gmail.com)

>Commiter: Chris Blazek (chris.blazek@gmail.com)




### adding clarity to the setup process
>Fri, 15 Nov 2013 11:35:19 -0600

>Author: Chris Blazek (chris.blazek@gmail.com)

>Commiter: Chris Blazek (chris.blazek@gmail.com)




### playing with tavis & npm settings
>Tue, 5 Nov 2013 20:40:34 -0600

>Author: kingbin (chris.blazek@gmail.com)

>Commiter: kingbin (chris.blazek@gmail.com)




### 0.0.6
>Tue, 5 Nov 2013 20:35:03 -0600

>Author: kingbin (chris.blazek@gmail.com)

>Commiter: kingbin (chris.blazek@gmail.com)




### npm automation
>Tue, 5 Nov 2013 20:26:25 -0600

>Author: kingbin (chris.blazek@gmail.com)

>Commiter: kingbin (chris.blazek@gmail.com)




### setting up npm automation deployment
>Tue, 5 Nov 2013 20:14:34 -0600

>Author: kingbin (chris.blazek@gmail.com)

>Commiter: kingbin (chris.blazek@gmail.com)




### ver bump
>Sun, 3 Nov 2013 16:43:46 -0600

>Author: kingbin (chris.blazek@gmail.com)

>Commiter: kingbin (chris.blazek@gmail.com)




### philips hue header help update
>Sun, 3 Nov 2013 16:43:16 -0600

>Author: kingbin (chris.blazek@gmail.com)

>Commiter: kingbin (chris.blazek@gmail.com)




### ver bump
>Sun, 3 Nov 2013 16:28:02 -0600

>Author: kingbin (chris.blazek@gmail.com)

>Commiter: kingbin (chris.blazek@gmail.com)




### readme installation addition
>Sun, 3 Nov 2013 16:27:05 -0600

>Author: kingbin (chris.blazek@gmail.com)

>Commiter: kingbin (chris.blazek@gmail.com)




### travis readme tag
>Sun, 3 Nov 2013 16:20:45 -0600

>Author: kingbin (chris.blazek@gmail.com)

>Commiter: kingbin (chris.blazek@gmail.com)




### travis build
>Sun, 3 Nov 2013 16:19:15 -0600

>Author: kingbin (chris.blazek@gmail.com)

>Commiter: kingbin (chris.blazek@gmail.com)




### ver bump
>Sun, 3 Nov 2013 16:13:37 -0600

>Author: kingbin (chris.blazek@gmail.com)

>Commiter: kingbin (chris.blazek@gmail.com)




### tweaks
>Sun, 3 Nov 2013 16:09:57 -0600

>Author: kingbin (chris.blazek@gmail.com)

>Commiter: kingbin (chris.blazek@gmail.com)




### ver bump and syntax error
>Sun, 3 Nov 2013 15:43:10 -0600

>Author: kingbin (chris.blazek@gmail.com)

>Commiter: kingbin (chris.blazek@gmail.com)




### moving to suggested hubot-example script
>Sun, 3 Nov 2013 15:23:02 -0600

>Author: kingbin (chris.blazek@gmail.com)

>Commiter: kingbin (chris.blazek@gmail.com)




### moving to suggested hubot-example script
>Sun, 3 Nov 2013 15:22:28 -0600

>Author: kingbin (chris.blazek@gmail.com)

>Commiter: kingbin (chris.blazek@gmail.com)




### tiny tweak on script command and command update
>Sun, 3 Nov 2013 14:40:16 -0600

>Author: kingbin (chris.blazek@gmail.com)

>Commiter: kingbin (chris.blazek@gmail.com)




### first commit
>Sun, 3 Nov 2013 14:39:00 -0600

>Author: kingbin (chris.blazek@gmail.com)

>Commiter: kingbin (chris.blazek@gmail.com)




