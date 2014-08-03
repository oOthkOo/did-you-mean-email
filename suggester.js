function EmailSuggester () {
          this.domains = [
              'aol',
              'aim',
              'caramail',
              'email',
              'fastmail',
              'free',
              'gawab',
              'gmail',
              'gmx',
              'hotmail',
              'hushmail',
              'laposte',
              'live',
              'mail',
              'myspace',
              'orange',
              'outlook',
              'rocketmail',
              'yahoo',
              'ymail',
              'yandex'
          ]
          this.topDomains = [
              //'academy',
              //'aero',
              //'asia',
              'am',
              //'bike',
              'biz',
              //'blue',
              //'build',
              //'builders',
              //'buzz',
              //'ca',
              //'cab',
              //'camera',
              //'camp',
              //'careers',
              //'cat',
              //'catholic',
              //'center',
              //'ceo',
              //'christmas',
              //'cloting',
              //'club',
              //'coffee',
              'com',
              'co.uk',
              //'compagny',
              //'computer',
              //'construction',
              //'contractors',
              //'coop',
              'de',
              //'diamonds',
              //'directory',
              //'domains',
              'email',
              //'enterprises',
              //'equipment',
              //'estate',
              'edu',
              'eu',
              //'eus',
              'fr',
              'fm',
              //'frogans',
              //'gallery',
              //'gift',
              //'glass',
              //'graphics',
              //'guitars',
              //'guru',
              'gov',
              'mil',
              //'holdings',
              //'holiday',
              //'house',
              'hk',
              'info',
              //'institute',
              'int',
              'io',
              'jp',
              //'jobs',
              //'kitchen',
              //'kim',
              //'land',
              //'lighting',
              //'limo',
              //'link',
              //'management',
              //'marketing',
              //'menu',
              'mobi',
              //'museum',
              //'name',
              'net',
              'nl',
              //'onl',
              'org',
              //'photo',
              //'photography',
              //'photos',
              //'pics',
              //'pink',
              //'plumbing',
              //'post',
              //'pro',
              //'recipes',
              //'red',
              //'repair',
              //'rich',
              'ru',
              //'sexy',
              //'shiksha',
              //'shoes',
              //'singles',
              //'solar',
              //'solutions',
              //'support',
              //'systems',
              //'technology',
              //'tattoo',
              //'tel',
              //'tips',
              //'today',
              //'training',
              //'travel',
              //'uno',
              'us',
              //'ventures',
              //'voyage',
              //'wed',
              //'wiki',
              //'xxx',
              //'みんな',
              //'在线',
              //'中文网',
              //'移动'
          ]
          this.providers = []
    }

    EmailSuggester.prototype.distance = function (s1, s2) {
        
        if (s1 == null || s1.length === 0) {
            if (s2 == null || s2.length === 0) {
                return 0;
            } else {
                return s2.length;
            }
        }

        if (s2 == null || s2.length === 0) {
            return s1.length;
        }

        var c = 0;
        var offset1 = 0;
        var offset2 = 0;
        var lcs = 0;
        var maxOffset = 5;

        while ((c + offset1 < s1.length) && (c + offset2 < s2.length)) {
            if (s1.charAt(c + offset1) == s2.charAt(c + offset2)) {
                lcs++;
            } else {
                offset1 = 0;
                offset2 = 0;
                for (var i = 0; i < maxOffset; i++) {
                    if ((c + i < s1.length) && (s1.charAt(c + i) == s2.charAt(c))) {
                        offset1 = i;
                        break;
                    }
                    if ((c + i < s2.length) && (s1.charAt(c) == s2.charAt(c + i))) {
                        offset2 = i;
                        break;
                    }
                }
            }
            c++;
        }
        return (s1.length + s2.length) / 2 - lcs;
    }

    EmailSuggester.prototype.isDomainExist = function ( domain ) {
        for (var d=0; d<this.domains.length; d++) {
            if (domain == this.domains[d]) {
                return true
            }
        }
        return false
    }

    EmailSuggester.prototype.isTopDomainExist = function ( topDomain ) {
        for (var d=0; d<this.topDomains.length; d++) {
            if (topDomain == this.topDomains[d]) {
                return true
            }
        }
        return false
    }

    EmailSuggester.prototype.check = function ( email ) {
        
        email = email.toLowerCase()
        
        //console.log( 'email', email )
        var match = email.match(/^(.*)@/)
        if (!match || match.length < 2) {
            return null
        }
        var username = match[1]
        //console.log( 'username', username )
        match = email.match(/@(.*)\./)
        if (!match || match.length < 2) {
            return null
        }
        var domain = match[1]
        //console.log( 'domain', domain )
        match = email.match(/\.(.*)$/)
        if (!match || match.length < 2) {
            return null
        }
        var topDomain = match[1]
        //console.log( 'topdomain', topDomain )
        
        var suggest = {
            username: username,
            domain: domain,
            topDomain: topDomain,
            result: ''
        }
        
        var mdd = 99
        var mdtd = 99
        var domainFound = this.isDomainExist( domain )
        var topDomainFound = this.isTopDomainExist( topDomain )
        if (!domainFound || !topDomainFound) {
            if (!domainFound) {
                for (var d=0; d<this.domains.length; d++) {
                   var sd = this.domains[d]
                   var dd = this.distance( domain, sd )
                   //console.log( sd, dd )
                   if (dd < mdd) {
                       suggest.domain = sd
                       mdd = dd
                   }
                }
            }
            if (!topDomainFound) {
                for (var d=0; d<this.topDomains.length; d++) {
                   var std = this.topDomains[d]
                   var dtd = this.distance( topDomain, std )
                   if (dtd < mdtd) {
                       suggest.topDomain = std
                       mdtd = dtd
                   }
                }
            }
            suggest.result = suggest.username + '@' + suggest.domain + '.' + suggest.topDomain
            return suggest
        }
        return null
    }
