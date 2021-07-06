(function ($)
{
// Plugin zParallel

    function zParallel(options)
    {
        var self = this;

        self.defaults = {
            selectorToRun: null,
            funcRun: null,
            lengthToRun: 0,
            iterScheduled: 0,
            ticksToRun: 50,
            showDebugInfo: true
        };

        self.opts = $.extend({}, self.defaults, options);
    }

    zParallel.prototype = {

        init: function ()
        {
            var self = this;

            var selector = $(self.opts.selectorToRun);
            self.lengthToRun = selector.length;

            if (self.lengthToRun > 0)
            {
                self.arrayOfThis = new Array;
                selector.each(function ()
                {
                    self.arrayOfThis.push(this);
                });
                self.arrayOfThis.reverse();
                self.opts.iterScheduled = 0;
                self.whenStarted = Date.now();
                self.run();
                return true;
            }
            else
            {
                this.out('zParallel: selector is empty');
                return false;
            }
        },

        run: function () 
        {
            var self = this;
            var nextTicks = Date.now() + self.opts.ticksToRun;
            var _debug = self.opts.showDebugInfo;

            if (self.opts.iterScheduled === 0)
            {
                nextTicks -= (self.opts.ticksToRun + 1);   // Goto to Scheduling run
            }

            var count = 0;
            var comOut = "";
            while ((self.lengthToRun = self.arrayOfThis.length) > 0)
            {
                var curTicks = Date.now();

                if (_debug)
                {
                    comOut = self.opts.name + " |" + (curTicks - self.whenStarted)/1000 + "s| ";
                    if (self.opts.iterScheduled === 0)
                        this.out("START " + comOut + " remaining #" + self.lengthToRun);
                }

                if (curTicks > nextTicks)
                {
                    self.opts.iterScheduled++;

                    if ('requestIdleCallback' in window)
                    {
                        if (_debug)
                            this.out(comOut + "requestIdleCallback , remaining #" + self.lengthToRun + " executed: #" + count);
                        window.requestIdleCallback(function () { self.run() }, { timeout: 1000 });
                    } else
                    {
                        if (_debug)
                            this.out(comOut + "setTimeout, remaining #" + self.lengthToRun + " executed: #" + count);
                        setTimeout(function () { self.run() }, 10);
                    }
                    return true;
                }

                var nexThis = self.arrayOfThis.pop();
                self.opts.funcRun(nexThis);
                count++;
            }
            if (_debug)
                this.out("END " + comOut + " executed:  #" + count);

            return true;
        },
        out: function (str)
        {
            if (typeof console !== 'undefined')
                console.log(str);
        }
    };


    $.fn.zParallel = function (options)
    {
        var rev = new zParallel(options);
        rev.init();
    };
})(jQuery);

