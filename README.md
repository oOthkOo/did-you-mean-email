This javascript suggest you an email when it detect a possible mistake.

Examples
-----
- toto@hotm.c    -> toto@hotmail.com
- toto@al.f      -> toto@aol.fr
- toto@yndex.r   -> toto@yandex.ru
- toto@fr.f      -> toto@free.fr
- toto@craml.com -> toto@caramail.com

Usage
-----
```javascript
var es = new EmailSuggester()
console.log( 'suggest', es.check('toto@hotm.c') )
```

