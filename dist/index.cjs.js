'use strict';

var svelte = require('svelte');

/** @returns {void} */
function noop() {}

function run(fn) {
	return fn();
}

function blank_object() {
	return Object.create(null);
}

/**
 * @param {Function[]} fns
 * @returns {void}
 */
function run_all(fns) {
	fns.forEach(run);
}

/**
 * @param {any} thing
 * @returns {thing is Function}
 */
function is_function(thing) {
	return typeof thing === 'function';
}

/** @returns {boolean} */
function safe_not_equal(a, b) {
	return a != a ? b == b : a !== b || (a && typeof a === 'object') || typeof a === 'function';
}

/** @returns {boolean} */
function is_empty(obj) {
	return Object.keys(obj).length === 0;
}

/**
 * @param {Node} target
 * @param {Node} node
 * @returns {void}
 */
function append(target, node) {
	target.appendChild(node);
}

/**
 * @param {Node} target
 * @param {string} style_sheet_id
 * @param {string} styles
 * @returns {void}
 */
function append_styles(target, style_sheet_id, styles) {
	const append_styles_to = get_root_for_style(target);
	if (!append_styles_to.getElementById(style_sheet_id)) {
		const style = element('style');
		style.id = style_sheet_id;
		style.textContent = styles;
		append_stylesheet(append_styles_to, style);
	}
}

/**
 * @param {Node} node
 * @returns {ShadowRoot | Document}
 */
function get_root_for_style(node) {
	if (!node) return document;
	const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
	if (root && /** @type {ShadowRoot} */ (root).host) {
		return /** @type {ShadowRoot} */ (root);
	}
	return node.ownerDocument;
}

/**
 * @param {ShadowRoot | Document} node
 * @param {HTMLStyleElement} style
 * @returns {CSSStyleSheet}
 */
function append_stylesheet(node, style) {
	append(/** @type {Document} */ (node).head || node, style);
	return style.sheet;
}

/**
 * @param {Node} target
 * @param {Node} node
 * @param {Node} [anchor]
 * @returns {void}
 */
function insert(target, node, anchor) {
	target.insertBefore(node, anchor || null);
}

/**
 * @param {Node} node
 * @returns {void}
 */
function detach(node) {
	if (node.parentNode) {
		node.parentNode.removeChild(node);
	}
}

/**
 * @returns {void} */
function destroy_each(iterations, detaching) {
	for (let i = 0; i < iterations.length; i += 1) {
		if (iterations[i]) iterations[i].d(detaching);
	}
}

/**
 * @template {keyof HTMLElementTagNameMap} K
 * @param {K} name
 * @returns {HTMLElementTagNameMap[K]}
 */
function element(name) {
	return document.createElement(name);
}

/**
 * @template {keyof SVGElementTagNameMap} K
 * @param {K} name
 * @returns {SVGElement}
 */
function svg_element(name) {
	return document.createElementNS('http://www.w3.org/2000/svg', name);
}

/**
 * @param {string} data
 * @returns {Text}
 */
function text(data) {
	return document.createTextNode(data);
}

/**
 * @returns {Text} */
function space() {
	return text(' ');
}

/**
 * @returns {Text} */
function empty() {
	return text('');
}

/**
 * @param {EventTarget} node
 * @param {string} event
 * @param {EventListenerOrEventListenerObject} handler
 * @param {boolean | AddEventListenerOptions | EventListenerOptions} [options]
 * @returns {() => void}
 */
function listen(node, event, handler, options) {
	node.addEventListener(event, handler, options);
	return () => node.removeEventListener(event, handler, options);
}

/**
 * @param {Element} node
 * @param {string} attribute
 * @param {string} [value]
 * @returns {void}
 */
function attr(node, attribute, value) {
	if (value == null) node.removeAttribute(attribute);
	else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
}

/**
 * @param {Element} element
 * @returns {ChildNode[]}
 */
function children(element) {
	return Array.from(element.childNodes);
}

/**
 * @returns {void} */
function set_style(node, key, value, important) {
	if (value == null) {
		node.style.removeProperty(key);
	} else {
		node.style.setProperty(key, value, '');
	}
}

/**
 * @returns {void} */
function toggle_class(element, name, toggle) {
	// The `!!` is required because an `undefined` flag means flipping the current state.
	element.classList.toggle(name, !!toggle);
}
/** */
class HtmlTag {
	/**
	 * @private
	 * @default false
	 */
	is_svg = false;
	/** parent for creating node */
	e = undefined;
	/** html tag nodes */
	n = undefined;
	/** target */
	t = undefined;
	/** anchor */
	a = undefined;
	constructor(is_svg = false) {
		this.is_svg = is_svg;
		this.e = this.n = null;
	}

	/**
	 * @param {string} html
	 * @returns {void}
	 */
	c(html) {
		this.h(html);
	}

	/**
	 * @param {string} html
	 * @param {HTMLElement | SVGElement} target
	 * @param {HTMLElement | SVGElement} anchor
	 * @returns {void}
	 */
	m(html, target, anchor = null) {
		if (!this.e) {
			if (this.is_svg)
				this.e = svg_element(/** @type {keyof SVGElementTagNameMap} */ (target.nodeName));
			/** #7364  target for <template> may be provided as #document-fragment(11) */ else
				this.e = element(
					/** @type {keyof HTMLElementTagNameMap} */ (
						target.nodeType === 11 ? 'TEMPLATE' : target.nodeName
					)
				);
			this.t =
				target.tagName !== 'TEMPLATE'
					? target
					: /** @type {HTMLTemplateElement} */ (target).content;
			this.c(html);
		}
		this.i(anchor);
	}

	/**
	 * @param {string} html
	 * @returns {void}
	 */
	h(html) {
		this.e.innerHTML = html;
		this.n = Array.from(
			this.e.nodeName === 'TEMPLATE' ? this.e.content.childNodes : this.e.childNodes
		);
	}

	/**
	 * @returns {void} */
	i(anchor) {
		for (let i = 0; i < this.n.length; i += 1) {
			insert(this.t, this.n[i], anchor);
		}
	}

	/**
	 * @param {string} html
	 * @returns {void}
	 */
	p(html) {
		this.d();
		this.h(html);
		this.i(this.a);
	}

	/**
	 * @returns {void} */
	d() {
		this.n.forEach(detach);
	}
}

/**
 * @typedef {Node & {
 * 	claim_order?: number;
 * 	hydrate_init?: true;
 * 	actual_end_child?: NodeEx;
 * 	childNodes: NodeListOf<NodeEx>;
 * }} NodeEx
 */

/** @typedef {ChildNode & NodeEx} ChildNodeEx */

/** @typedef {NodeEx & { claim_order: number }} NodeEx2 */

/**
 * @typedef {ChildNodeEx[] & {
 * 	claim_info?: {
 * 		last_index: number;
 * 		total_claimed: number;
 * 	};
 * }} ChildNodeArray
 */

let current_component;

/** @returns {void} */
function set_current_component(component) {
	current_component = component;
}

const dirty_components = [];
const binding_callbacks = [];

let render_callbacks = [];

const flush_callbacks = [];

const resolved_promise = /* @__PURE__ */ Promise.resolve();

let update_scheduled = false;

/** @returns {void} */
function schedule_update() {
	if (!update_scheduled) {
		update_scheduled = true;
		resolved_promise.then(flush);
	}
}

/** @returns {void} */
function add_render_callback(fn) {
	render_callbacks.push(fn);
}

// flush() calls callbacks in this order:
// 1. All beforeUpdate callbacks, in order: parents before children
// 2. All bind:this callbacks, in reverse order: children before parents.
// 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
//    for afterUpdates called during the initial onMount, which are called in
//    reverse order: children before parents.
// Since callbacks might update component values, which could trigger another
// call to flush(), the following steps guard against this:
// 1. During beforeUpdate, any updated components will be added to the
//    dirty_components array and will cause a reentrant call to flush(). Because
//    the flush index is kept outside the function, the reentrant call will pick
//    up where the earlier call left off and go through all dirty components. The
//    current_component value is saved and restored so that the reentrant call will
//    not interfere with the "parent" flush() call.
// 2. bind:this callbacks cannot trigger new flush() calls.
// 3. During afterUpdate, any updated components will NOT have their afterUpdate
//    callback called a second time; the seen_callbacks set, outside the flush()
//    function, guarantees this behavior.
const seen_callbacks = new Set();

let flushidx = 0; // Do *not* move this inside the flush() function

/** @returns {void} */
function flush() {
	// Do not reenter flush while dirty components are updated, as this can
	// result in an infinite loop. Instead, let the inner flush handle it.
	// Reentrancy is ok afterwards for bindings etc.
	if (flushidx !== 0) {
		return;
	}
	const saved_component = current_component;
	do {
		// first, call beforeUpdate functions
		// and update components
		try {
			while (flushidx < dirty_components.length) {
				const component = dirty_components[flushidx];
				flushidx++;
				set_current_component(component);
				update(component.$$);
			}
		} catch (e) {
			// reset dirty state to not end up in a deadlocked state and then rethrow
			dirty_components.length = 0;
			flushidx = 0;
			throw e;
		}
		set_current_component(null);
		dirty_components.length = 0;
		flushidx = 0;
		while (binding_callbacks.length) binding_callbacks.pop()();
		// then, once components are updated, call
		// afterUpdate functions. This may cause
		// subsequent updates...
		for (let i = 0; i < render_callbacks.length; i += 1) {
			const callback = render_callbacks[i];
			if (!seen_callbacks.has(callback)) {
				// ...so guard against infinite loops
				seen_callbacks.add(callback);
				callback();
			}
		}
		render_callbacks.length = 0;
	} while (dirty_components.length);
	while (flush_callbacks.length) {
		flush_callbacks.pop()();
	}
	update_scheduled = false;
	seen_callbacks.clear();
	set_current_component(saved_component);
}

/** @returns {void} */
function update($$) {
	if ($$.fragment !== null) {
		$$.update();
		run_all($$.before_update);
		const dirty = $$.dirty;
		$$.dirty = [-1];
		$$.fragment && $$.fragment.p($$.ctx, dirty);
		$$.after_update.forEach(add_render_callback);
	}
}

/**
 * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
 * @param {Function[]} fns
 * @returns {void}
 */
function flush_render_callbacks(fns) {
	const filtered = [];
	const targets = [];
	render_callbacks.forEach((c) => (fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c)));
	targets.forEach((c) => c());
	render_callbacks = filtered;
}

const outroing = new Set();

/**
 * @param {import('./private.js').Fragment} block
 * @param {0 | 1} [local]
 * @returns {void}
 */
function transition_in(block, local) {
	if (block && block.i) {
		outroing.delete(block);
		block.i(local);
	}
}

/** @typedef {1} INTRO */
/** @typedef {0} OUTRO */
/** @typedef {{ direction: 'in' | 'out' | 'both' }} TransitionOptions */
/** @typedef {(node: Element, params: any, options: TransitionOptions) => import('../transition/public.js').TransitionConfig} TransitionFn */

/**
 * @typedef {Object} Outro
 * @property {number} r
 * @property {Function[]} c
 * @property {Object} p
 */

/**
 * @typedef {Object} PendingProgram
 * @property {number} start
 * @property {INTRO|OUTRO} b
 * @property {Outro} [group]
 */

/**
 * @typedef {Object} Program
 * @property {number} a
 * @property {INTRO|OUTRO} b
 * @property {1|-1} d
 * @property {number} duration
 * @property {number} start
 * @property {number} end
 * @property {Outro} [group]
 */

// general each functions:

function ensure_array_like(array_like_or_iterator) {
	return array_like_or_iterator?.length !== undefined
		? array_like_or_iterator
		: Array.from(array_like_or_iterator);
}

/** @returns {void} */
function mount_component(component, target, anchor) {
	const { fragment, after_update } = component.$$;
	fragment && fragment.m(target, anchor);
	// onMount happens before the initial afterUpdate
	add_render_callback(() => {
		const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
		// if the component was destroyed immediately
		// it will update the `$$.on_destroy` reference to `null`.
		// the destructured on_destroy may still reference to the old array
		if (component.$$.on_destroy) {
			component.$$.on_destroy.push(...new_on_destroy);
		} else {
			// Edge case - component was destroyed immediately,
			// most likely as a result of a binding initialising
			run_all(new_on_destroy);
		}
		component.$$.on_mount = [];
	});
	after_update.forEach(add_render_callback);
}

/** @returns {void} */
function destroy_component(component, detaching) {
	const $$ = component.$$;
	if ($$.fragment !== null) {
		flush_render_callbacks($$.after_update);
		run_all($$.on_destroy);
		$$.fragment && $$.fragment.d(detaching);
		// TODO null out other refs, including component.$$ (but need to
		// preserve final state?)
		$$.on_destroy = $$.fragment = null;
		$$.ctx = [];
	}
}

/** @returns {void} */
function make_dirty(component, i) {
	if (component.$$.dirty[0] === -1) {
		dirty_components.push(component);
		schedule_update();
		component.$$.dirty.fill(0);
	}
	component.$$.dirty[(i / 31) | 0] |= 1 << i % 31;
}

// TODO: Document the other params
/**
 * @param {SvelteComponent} component
 * @param {import('./public.js').ComponentConstructorOptions} options
 *
 * @param {import('./utils.js')['not_equal']} not_equal Used to compare props and state values.
 * @param {(target: Element | ShadowRoot) => void} [append_styles] Function that appends styles to the DOM when the component is first initialised.
 * This will be the `add_css` function from the compiled component.
 *
 * @returns {void}
 */
function init(
	component,
	options,
	instance,
	create_fragment,
	not_equal,
	props,
	append_styles = null,
	dirty = [-1]
) {
	const parent_component = current_component;
	set_current_component(component);
	/** @type {import('./private.js').T$$} */
	const $$ = (component.$$ = {
		fragment: null,
		ctx: [],
		// state
		props,
		update: noop,
		not_equal,
		bound: blank_object(),
		// lifecycle
		on_mount: [],
		on_destroy: [],
		on_disconnect: [],
		before_update: [],
		after_update: [],
		context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
		// everything else
		callbacks: blank_object(),
		dirty,
		skip_bound: false,
		root: options.target || parent_component.$$.root
	});
	append_styles && append_styles($$.root);
	let ready = false;
	$$.ctx = instance
		? instance(component, options.props || {}, (i, ret, ...rest) => {
				const value = rest.length ? rest[0] : ret;
				if ($$.ctx && not_equal($$.ctx[i], ($$.ctx[i] = value))) {
					if (!$$.skip_bound && $$.bound[i]) $$.bound[i](value);
					if (ready) make_dirty(component, i);
				}
				return ret;
		  })
		: [];
	$$.update();
	ready = true;
	run_all($$.before_update);
	// `false` as a special case of no DOM component
	$$.fragment = create_fragment ? create_fragment($$.ctx) : false;
	if (options.target) {
		if (options.hydrate) {
			// TODO: what is the correct type here?
			// @ts-expect-error
			const nodes = children(options.target);
			$$.fragment && $$.fragment.l(nodes);
			nodes.forEach(detach);
		} else {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			$$.fragment && $$.fragment.c();
		}
		if (options.intro) transition_in(component.$$.fragment);
		mount_component(component, options.target, options.anchor);
		flush();
	}
	set_current_component(parent_component);
}

/**
 * Base class for Svelte components. Used when dev=false.
 *
 * @template {Record<string, any>} [Props=any]
 * @template {Record<string, any>} [Events=any]
 */
class SvelteComponent {
	/**
	 * ### PRIVATE API
	 *
	 * Do not use, may change at any time
	 *
	 * @type {any}
	 */
	$$ = undefined;
	/**
	 * ### PRIVATE API
	 *
	 * Do not use, may change at any time
	 *
	 * @type {any}
	 */
	$$set = undefined;

	/** @returns {void} */
	$destroy() {
		destroy_component(this, 1);
		this.$destroy = noop;
	}

	/**
	 * @template {Extract<keyof Events, string>} K
	 * @param {K} type
	 * @param {((e: Events[K]) => void) | null | undefined} callback
	 * @returns {() => void}
	 */
	$on(type, callback) {
		if (!is_function(callback)) {
			return noop;
		}
		const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
		callbacks.push(callback);
		return () => {
			const index = callbacks.indexOf(callback);
			if (index !== -1) callbacks.splice(index, 1);
		};
	}

	/**
	 * @param {Partial<Props>} props
	 * @returns {void}
	 */
	$set(props) {
		if (this.$$set && !is_empty(props)) {
			this.$$.skip_bound = true;
			this.$$set(props);
			this.$$.skip_bound = false;
		}
	}
}

/**
 * @typedef {Object} CustomElementPropDefinition
 * @property {string} [attribute]
 * @property {boolean} [reflect]
 * @property {'String'|'Boolean'|'Number'|'Array'|'Object'} [type]
 */

// generated during release, do not modify

const PUBLIC_VERSION = '4';

if (typeof window !== 'undefined')
	// @ts-ignore
	(window.__svelte || (window.__svelte = { v: new Set() })).v.add(PUBLIC_VERSION);

/* src\SvelteFlexSlider.svelte generated by Svelte v4.2.19 */

function add_css(target) {
	append_styles(target, "svelte-3st99", ".slider-container.svelte-3st99{width:100%;overflow:hidden;position:relative}.slider-wrapper.svelte-3st99{display:flex;transition:transform 0.3s ease}.card.svelte-3st99{flex-shrink:0;box-sizing:border-box}.nav-button.svelte-3st99{position:absolute;top:50%;transform:translateY(-50%);z-index:1;background:#1f29374d;color:white;border:none;padding:10px;cursor:pointer;font-size:24px;width:40px;height:40px;border-radius:50%;display:flex;justify-content:center;align-items:center}.nav-button.prev.svelte-3st99{left:0px}.nav-button.next.svelte-3st99{right:0px}.nav-button.svelte-3st99:disabled{opacity:0.5;cursor:not-allowed}.indicators.svelte-3st99{position:absolute;bottom:10px;left:50%;transform:translateX(-50%);display:flex;gap:10px}.indicator.svelte-3st99{width:10px;height:10px;border-radius:50%;background-color:rgba(255, 255, 255, 0.5);border:none;padding:0;cursor:pointer}.indicator.active.svelte-3st99{background-color:white}");
}

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[25] = list[i];
	child_ctx[27] = i;
	return child_ctx;
}

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[28] = list[i];
	child_ctx[27] = i;
	return child_ctx;
}

// (123:2) {#if cardWidth && containerWidth}
function create_if_block(ctx) {
	let div;
	let t0;
	let t1;
	let if_block1_anchor;
	let each_value_1 = ensure_array_like(/*cards*/ ctx[0]);
	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
	}

	let if_block0 = /*showNavButtons*/ ctx[2] && create_if_block_2(ctx);
	let if_block1 = /*showIndicators*/ ctx[3] && create_if_block_1(ctx);

	return {
		c() {
			div = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t0 = space();
			if (if_block0) if_block0.c();
			t1 = space();
			if (if_block1) if_block1.c();
			if_block1_anchor = empty();
			attr(div, "class", "slider-wrapper svelte-3st99");
			set_style(div, "transform", "translateX(-" + /*currentIndex*/ ctx[4] * /*cardWidth*/ ctx[8] + "px)");
			set_style(div, "transition", "transform 0.3s ease");
		},
		m(target, anchor) {
			insert(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(div, null);
				}
			}

			insert(target, t0, anchor);
			if (if_block0) if_block0.m(target, anchor);
			insert(target, t1, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert(target, if_block1_anchor, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*cardWidth, cards*/ 257) {
				each_value_1 = ensure_array_like(/*cards*/ ctx[0]);
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_1(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_1.length;
			}

			if (dirty & /*currentIndex, cardWidth*/ 272) {
				set_style(div, "transform", "translateX(-" + /*currentIndex*/ ctx[4] * /*cardWidth*/ ctx[8] + "px)");
			}

			if (/*showNavButtons*/ ctx[2]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_2(ctx);
					if_block0.c();
					if_block0.m(t1.parentNode, t1);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (/*showIndicators*/ ctx[3]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_1(ctx);
					if_block1.c();
					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}
		},
		d(detaching) {
			if (detaching) {
				detach(div);
				detach(t0);
				detach(t1);
				detach(if_block1_anchor);
			}

			destroy_each(each_blocks, detaching);
			if (if_block0) if_block0.d(detaching);
			if (if_block1) if_block1.d(detaching);
		}
	};
}

// (129:6) {#each cards as card, index}
function create_each_block_1(ctx) {
	let div;
	let html_tag;
	let raw_value = /*card*/ ctx[28] + "";
	let t;

	return {
		c() {
			div = element("div");
			html_tag = new HtmlTag(false);
			t = space();
			html_tag.a = t;
			attr(div, "class", "card svelte-3st99");
			set_style(div, "width", /*cardWidth*/ ctx[8] + "px");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			html_tag.m(raw_value, div);
			append(div, t);
		},
		p(ctx, dirty) {
			if (dirty & /*cards*/ 1 && raw_value !== (raw_value = /*card*/ ctx[28] + "")) html_tag.p(raw_value);

			if (dirty & /*cardWidth*/ 256) {
				set_style(div, "width", /*cardWidth*/ ctx[8] + "px");
			}
		},
		d(detaching) {
			if (detaching) {
				detach(div);
			}
		}
	};
}

// (135:4) {#if showNavButtons}
function create_if_block_2(ctx) {
	let button0;
	let t0;
	let button0_disabled_value;
	let t1;
	let button1;
	let t2;
	let button1_disabled_value;
	let mounted;
	let dispose;

	return {
		c() {
			button0 = element("button");
			t0 = text("‹");
			t1 = space();
			button1 = element("button");
			t2 = text("›");
			attr(button0, "class", "nav-button prev svelte-3st99");
			button0.disabled = button0_disabled_value = !/*loop*/ ctx[1] && /*currentIndex*/ ctx[4] === 0;
			attr(button1, "class", "nav-button next svelte-3st99");
			button1.disabled = button1_disabled_value = !/*loop*/ ctx[1] && /*currentIndex*/ ctx[4] === /*totalCards*/ ctx[6] - /*currentVisibleCards*/ ctx[5];
		},
		m(target, anchor) {
			insert(target, button0, anchor);
			append(button0, t0);
			insert(target, t1, anchor);
			insert(target, button1, anchor);
			append(button1, t2);

			if (!mounted) {
				dispose = [
					listen(button0, "click", /*prev*/ ctx[12]),
					listen(button1, "click", /*next*/ ctx[11])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*loop, currentIndex*/ 18 && button0_disabled_value !== (button0_disabled_value = !/*loop*/ ctx[1] && /*currentIndex*/ ctx[4] === 0)) {
				button0.disabled = button0_disabled_value;
			}

			if (dirty & /*loop, currentIndex, totalCards, currentVisibleCards*/ 114 && button1_disabled_value !== (button1_disabled_value = !/*loop*/ ctx[1] && /*currentIndex*/ ctx[4] === /*totalCards*/ ctx[6] - /*currentVisibleCards*/ ctx[5])) {
				button1.disabled = button1_disabled_value;
			}
		},
		d(detaching) {
			if (detaching) {
				detach(button0);
				detach(t1);
				detach(button1);
			}

			mounted = false;
			run_all(dispose);
		}
	};
}

// (148:4) {#if showIndicators}
function create_if_block_1(ctx) {
	let div;
	let each_value = ensure_array_like(Array(/*indicatorCount*/ ctx[10]));
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	return {
		c() {
			div = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(div, "class", "indicators svelte-3st99");
		},
		m(target, anchor) {
			insert(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(div, null);
				}
			}
		},
		p(ctx, dirty) {
			if (dirty & /*Math, currentIndex, currentVisibleCards, goToSlide, indicatorCount*/ 9264) {
				each_value = ensure_array_like(Array(/*indicatorCount*/ ctx[10]));
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		d(detaching) {
			if (detaching) {
				detach(div);
			}

			destroy_each(each_blocks, detaching);
		}
	};
}

// (150:8) {#each Array(indicatorCount) as _, index}
function create_each_block(ctx) {
	let button;
	let mounted;
	let dispose;

	function click_handler() {
		return /*click_handler*/ ctx[17](/*index*/ ctx[27]);
	}

	return {
		c() {
			button = element("button");
			attr(button, "class", "indicator svelte-3st99");
			toggle_class(button, "active", Math.floor(/*currentIndex*/ ctx[4] / /*currentVisibleCards*/ ctx[5]) === /*index*/ ctx[27]);
		},
		m(target, anchor) {
			insert(target, button, anchor);

			if (!mounted) {
				dispose = listen(button, "click", click_handler);
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty & /*Math, currentIndex, currentVisibleCards*/ 48) {
				toggle_class(button, "active", Math.floor(/*currentIndex*/ ctx[4] / /*currentVisibleCards*/ ctx[5]) === /*index*/ ctx[27]);
			}
		},
		d(detaching) {
			if (detaching) {
				detach(button);
			}

			mounted = false;
			dispose();
		}
	};
}

function create_fragment(ctx) {
	let div;
	let if_block = /*cardWidth*/ ctx[8] && /*containerWidth*/ ctx[7] && create_if_block(ctx);

	return {
		c() {
			div = element("div");
			if (if_block) if_block.c();
			attr(div, "class", "slider-container svelte-3st99");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			if (if_block) if_block.m(div, null);
			/*div_binding*/ ctx[18](div);
		},
		p(ctx, [dirty]) {
			if (/*cardWidth*/ ctx[8] && /*containerWidth*/ ctx[7]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					if_block.m(div, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) {
				detach(div);
			}

			if (if_block) if_block.d();
			/*div_binding*/ ctx[18](null);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let totalCards;
	let indicatorCount;
	let { cards = [] } = $$props;
	let { autoplay = true } = $$props;
	let { interval = 3000 } = $$props;
	let { loop = true } = $$props;
	let { visibleCards = { default: 3 } } = $$props;
	let { showNavButtons = true } = $$props;
	let { showIndicators = true } = $$props;
	let currentIndex = 0;

	/**
 * @type {number}
 */
	let containerWidth;

	/**
 * @type {number}
 */
	let cardWidth;

	/**
 * @type {HTMLDivElement}
 */
	let container;

	let isTransitioning = false;

	/**
 * @type {number}
 */
	let currentVisibleCards;

	svelte.onMount(() => {
		updateDimensions();
		if (autoplay) startAutoplay();
		window.addEventListener("resize", updateDimensions);
	});

	svelte.afterUpdate(() => {
		updateDimensions();
	});

	function updateDimensions() {
		if (container) {
			$$invalidate(7, containerWidth = container.offsetWidth);
			$$invalidate(5, currentVisibleCards = getVisibleCards(document.body.clientWidth));
			$$invalidate(8, cardWidth = containerWidth / currentVisibleCards);
		}
	}

	/**
 * @param {number} width
 */
	function getVisibleCards(width) {
		const breakpoints = Object.keys(visibleCards).map(Number).sort((a, b) => b - a);

		for (let breakpoint of breakpoints) {
			if (width >= breakpoint) {
				// @ts-ignore
				return visibleCards[breakpoint];
			}
		}

		return visibleCards.default;
	}

	function startAutoplay() {
		setInterval(
			() => {
				if (!isTransitioning) {
					next();
				}
			},
			interval
		);
	}

	function next() {
		if (currentIndex < totalCards - currentVisibleCards) {
			$$invalidate(4, currentIndex++, currentIndex);
		} else if (loop) {
			$$invalidate(4, currentIndex = 0);
		}

		smoothTransition();
	}

	function prev() {
		if (currentIndex > 0) {
			$$invalidate(4, currentIndex--, currentIndex);
		} else if (loop) {
			$$invalidate(4, currentIndex = totalCards - currentVisibleCards);
		}

		smoothTransition();
	}

	function smoothTransition() {
		isTransitioning = true;

		setTimeout(
			() => {
				isTransitioning = false;
			},
			100
		);
	}

	/**
 * @param {number} index
 */
	function goToSlide(index) {
		$$invalidate(4, currentIndex = index * currentVisibleCards);

		if (currentIndex > totalCards - currentVisibleCards) {
			$$invalidate(4, currentIndex = totalCards - currentVisibleCards);
		}

		smoothTransition();
	}

	const click_handler = index => goToSlide(index);

	function div_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			container = $$value;
			$$invalidate(9, container);
		});
	}

	$$self.$$set = $$props => {
		if ('cards' in $$props) $$invalidate(0, cards = $$props.cards);
		if ('autoplay' in $$props) $$invalidate(14, autoplay = $$props.autoplay);
		if ('interval' in $$props) $$invalidate(15, interval = $$props.interval);
		if ('loop' in $$props) $$invalidate(1, loop = $$props.loop);
		if ('visibleCards' in $$props) $$invalidate(16, visibleCards = $$props.visibleCards);
		if ('showNavButtons' in $$props) $$invalidate(2, showNavButtons = $$props.showNavButtons);
		if ('showIndicators' in $$props) $$invalidate(3, showIndicators = $$props.showIndicators);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*cards*/ 1) {
			$$invalidate(6, totalCards = cards.length);
		}

		if ($$self.$$.dirty & /*cards, currentIndex, currentVisibleCards*/ 49) {
			// @ts-ignore
			cards.slice(currentIndex, currentIndex + currentVisibleCards);
		}

		if ($$self.$$.dirty & /*totalCards, currentVisibleCards*/ 96) {
			$$invalidate(10, indicatorCount = Math.ceil(totalCards / currentVisibleCards));
		}
	};

	return [
		cards,
		loop,
		showNavButtons,
		showIndicators,
		currentIndex,
		currentVisibleCards,
		totalCards,
		containerWidth,
		cardWidth,
		container,
		indicatorCount,
		next,
		prev,
		goToSlide,
		autoplay,
		interval,
		visibleCards,
		click_handler,
		div_binding
	];
}

class SvelteFlexSlider extends SvelteComponent {
	constructor(options) {
		super();

		init(
			this,
			options,
			instance,
			create_fragment,
			safe_not_equal,
			{
				cards: 0,
				autoplay: 14,
				interval: 15,
				loop: 1,
				visibleCards: 16,
				showNavButtons: 2,
				showIndicators: 3
			},
			add_css
		);
	}
}

exports.SvelteFlexSlider = SvelteFlexSlider;
