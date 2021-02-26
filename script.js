( function() {
    
    'use strict';
    
    window.addEventListener( 'load', init, false );
    
    var input, repeat, speaky, stop, copy;
    
    function init() {
        
        var clipboard;
        
        input = document.getElementById( 'input' );
        repeat = document.getElementById( 'repeat' ); 

        speaky = document.getElementById( 'submit' );
        speaky.addEventListener( 'click', function() {
            stopSpeaking();
            speak();
        }, false );

        stop = document.getElementById( 'stop' );
        stop.addEventListener( 'click', stopSpeaking, false );
        
        copy = document.getElementById( 'copy' );
        clipboard = new ClipboardJS( copy );
        clipboard.on('success', function(e) {
            copy.innerHTML = 'copied';
            copy.classList.add( 'copied' );
        });
        
        input.focus();
        
    }
    
    function speak() {
        
        var r, speakThis;
        
        r = Number( repeat.value );
        
        setClipboardData();
        
        copy.innerHTML = 'copy';
        copy.classList.remove( 'copied' );
        
        speakThis = new SpeechSynthesisUtterance( input.value ); 
        for ( var i = 0; i<r; i++ ) {
            speechSynthesis.speak(speakThis);
        }
        
    }
    
    function stopSpeaking() {
        speechSynthesis.cancel();
    }
    
    function setClipboardData() {
        
        var clip;
        
        clip = 'var a=new SpeechSynthesisUtterance("';
        clip += input.value;
        clip += '");for(var i=0;i<';
        clip += Number( repeat.value );
        clip += ';i++){speechSynthesis.speak(a);}';
        
        copy.setAttribute( 'data-clipboard-text', clip );
        
    }
    
})();