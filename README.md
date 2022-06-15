# inline-c-in-nodejs

<a href="https://twitter.com/rsnous/status/1385168967279333376"><img src="doc/hmm.png" width="450"></a>

(<https://twitter.com/rsnous/status/1385168967279333376>)

([also thinking about
how](https://twitter.com/rsnous/status/1385365317900144643) the LuaJIT
FFI just has a parser for C declarations built in, how being able to
copy and paste stuff straight from header files is so much more
comfortable than transcribing the types into Scheme or Python or JS or
whatever other weird FFI syntax)

was testing 'inline C' in node.js last year, and have recently wanted
to finally put this up to explain to people.

I think part 

## notes

I wrote about this in [newsletter](https://github.com/sponsors/osnr) last year:

> also see:
>
> -   [LuaJIT FFI](https://luajit.org/ext_ffi.html)
> -   [tinycc](https://github.com/TinyCC/tinycc)-based stuff ([node-tinycc](https://github.com/jerch/node-tinycc), [tcltcc](https://wiki.tcl-lang.org/page/tcltcc))
> -   [Zigler](https://github.com/ityonemo/zigler#zig-nifs-made-easy) (via [Quinn Wilton](https://twitter.com/wilton_quinn/status/1385710927534706690))
>
> (we did similar work at Dynamicland to try and get all of that system,
> including the parts that deal with the underlying operating system and
> hardware, into the 'editable layer' of code on the pages)
>
> [another way to think about it](https://twitter.com/rsnous/status/1385704521389670400) is sort of like the TabFS documentation
> stuff. I don't want to be hopping [back and forth](https://twitter.com/rsnous/status/1351319206692868097) between a JS file
> that defines all the behavior, and another JS file that provides all
> the tests, and a Markdown file that provides all the documentation,
> and a C file that provides access to external capabilities. it should
> be [one file](https://twitter.com/rsnous/status/1353420813098131457)! the stuff that I'll want to consult or change at the same
> time should live in the same place, regardless of whether it happens
> to be C code or JavaScript code or prose.<sup><a id="fnr.1" class="footref" href="#fn.1" role="doc-backlink">1</a></sup>
>
> (also reminds me abstractly of [the Footsteps extension](https://twitter.com/Wattenberger/status/1361342759102201860), and of the
> super-lightweight plumb-based 'hyperlinks' in Acme. I think navigation
> remains very underrated as a problem)
>
> (because FFI bindings are work and are extra code to maintain, I
> almost feel like it is an all-or-nothing situation. like, either
> everything is on the JS side, or everything is on the C side. I don't
> want to be constantly setting up ad hoc communications between two
> weirdly shaped halves of the system; I think I want to bring over a
> spanning set of primitives from one side so I can just do everything
> on the other side. like so my bookkeeping -- my data structures for my
> ongoing processes -- can all live in JavaScript from the start, so
> when I want to play with something, I don't have to make up some
> channel on the spot to call back into C to figure out what's going on)

