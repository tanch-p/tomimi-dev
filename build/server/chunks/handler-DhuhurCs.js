import '../../shims.js';
import * as fs from 'node:fs';
import fs__default, { readdirSync, statSync, createReadStream } from 'node:fs';
import path, { resolve, sep, join, normalize } from 'node:path';
import process from 'node:process';
import http from 'node:http';
import { setImmediate } from 'node:timers';
import * as qs from 'node:querystring';
import { Readable } from 'node:stream';
import { S as SvelteKitError } from './chunks/shared.js-DJ6K7m7R.js';
import './chunks/utils.js-DJOK34TW.js';
import { S as Server } from './index.js-BlP8iaOk.js';
import { m as manifest } from './manifest.js-Bqx8y62h.js';
import { env, dir, env_prefix } from '../../env.js';
import { format } from 'node:url';

function totalist(dir, callback, pre='') {
	dir = resolve('.', dir);
	let arr = readdirSync(dir);
	let i=0, abs, stats;
	for (; i < arr.length; i++) {
		abs = join(dir, arr[i]);
		stats = statSync(abs);
		stats.isDirectory()
			? totalist(abs, callback, join(pre, arr[i]))
			: callback(join(pre, arr[i]), abs, stats);
	}
}

/**
 * @typedef ParsedURL
 * @type {import('.').ParsedURL}
 */

/**
 * @typedef Request
 * @property {string} url
 * @property {ParsedURL} _parsedUrl
 */

/**
 * @param {Request} req
 * @returns {ParsedURL|void}
 */
function parse$1(req) {
	let raw = req.url;
	if (raw == null) return;

	let prev = req._parsedUrl;
	if (prev && prev.raw === raw) return prev;

	let pathname=raw, search='', query;

	if (raw.length > 1) {
		let idx = raw.indexOf('?', 1);

		if (idx !== -1) {
			search = raw.substring(idx);
			pathname = raw.substring(0, idx);
			if (search.length > 1) {
				query = qs.parse(search.substring(1));
			}
		}
	}

	return req._parsedUrl = { pathname, search, query, raw };
}

const mimes = {
  "3g2": "video/3gpp2",
  "3gp": "video/3gpp",
  "3gpp": "video/3gpp",
  "3mf": "model/3mf",
  "aac": "audio/aac",
  "ac": "application/pkix-attr-cert",
  "adp": "audio/adpcm",
  "adts": "audio/aac",
  "ai": "application/postscript",
  "aml": "application/automationml-aml+xml",
  "amlx": "application/automationml-amlx+zip",
  "amr": "audio/amr",
  "apng": "image/apng",
  "appcache": "text/cache-manifest",
  "appinstaller": "application/appinstaller",
  "appx": "application/appx",
  "appxbundle": "application/appxbundle",
  "asc": "application/pgp-keys",
  "atom": "application/atom+xml",
  "atomcat": "application/atomcat+xml",
  "atomdeleted": "application/atomdeleted+xml",
  "atomsvc": "application/atomsvc+xml",
  "au": "audio/basic",
  "avci": "image/avci",
  "avcs": "image/avcs",
  "avif": "image/avif",
  "aw": "application/applixware",
  "bdoc": "application/bdoc",
  "bin": "application/octet-stream",
  "bmp": "image/bmp",
  "bpk": "application/octet-stream",
  "btf": "image/prs.btif",
  "btif": "image/prs.btif",
  "buffer": "application/octet-stream",
  "ccxml": "application/ccxml+xml",
  "cdfx": "application/cdfx+xml",
  "cdmia": "application/cdmi-capability",
  "cdmic": "application/cdmi-container",
  "cdmid": "application/cdmi-domain",
  "cdmio": "application/cdmi-object",
  "cdmiq": "application/cdmi-queue",
  "cer": "application/pkix-cert",
  "cgm": "image/cgm",
  "cjs": "application/node",
  "class": "application/java-vm",
  "coffee": "text/coffeescript",
  "conf": "text/plain",
  "cpl": "application/cpl+xml",
  "cpt": "application/mac-compactpro",
  "crl": "application/pkix-crl",
  "css": "text/css",
  "csv": "text/csv",
  "cu": "application/cu-seeme",
  "cwl": "application/cwl",
  "cww": "application/prs.cww",
  "davmount": "application/davmount+xml",
  "dbk": "application/docbook+xml",
  "deb": "application/octet-stream",
  "def": "text/plain",
  "deploy": "application/octet-stream",
  "dib": "image/bmp",
  "disposition-notification": "message/disposition-notification",
  "dist": "application/octet-stream",
  "distz": "application/octet-stream",
  "dll": "application/octet-stream",
  "dmg": "application/octet-stream",
  "dms": "application/octet-stream",
  "doc": "application/msword",
  "dot": "application/msword",
  "dpx": "image/dpx",
  "drle": "image/dicom-rle",
  "dsc": "text/prs.lines.tag",
  "dssc": "application/dssc+der",
  "dtd": "application/xml-dtd",
  "dump": "application/octet-stream",
  "dwd": "application/atsc-dwd+xml",
  "ear": "application/java-archive",
  "ecma": "application/ecmascript",
  "elc": "application/octet-stream",
  "emf": "image/emf",
  "eml": "message/rfc822",
  "emma": "application/emma+xml",
  "emotionml": "application/emotionml+xml",
  "eps": "application/postscript",
  "epub": "application/epub+zip",
  "exe": "application/octet-stream",
  "exi": "application/exi",
  "exp": "application/express",
  "exr": "image/aces",
  "ez": "application/andrew-inset",
  "fdf": "application/fdf",
  "fdt": "application/fdt+xml",
  "fits": "image/fits",
  "g3": "image/g3fax",
  "gbr": "application/rpki-ghostbusters",
  "geojson": "application/geo+json",
  "gif": "image/gif",
  "glb": "model/gltf-binary",
  "gltf": "model/gltf+json",
  "gml": "application/gml+xml",
  "gpx": "application/gpx+xml",
  "gram": "application/srgs",
  "grxml": "application/srgs+xml",
  "gxf": "application/gxf",
  "gz": "application/gzip",
  "h261": "video/h261",
  "h263": "video/h263",
  "h264": "video/h264",
  "heic": "image/heic",
  "heics": "image/heic-sequence",
  "heif": "image/heif",
  "heifs": "image/heif-sequence",
  "hej2": "image/hej2k",
  "held": "application/atsc-held+xml",
  "hjson": "application/hjson",
  "hlp": "application/winhlp",
  "hqx": "application/mac-binhex40",
  "hsj2": "image/hsj2",
  "htm": "text/html",
  "html": "text/html",
  "ics": "text/calendar",
  "ief": "image/ief",
  "ifb": "text/calendar",
  "iges": "model/iges",
  "igs": "model/iges",
  "img": "application/octet-stream",
  "in": "text/plain",
  "ini": "text/plain",
  "ink": "application/inkml+xml",
  "inkml": "application/inkml+xml",
  "ipfix": "application/ipfix",
  "iso": "application/octet-stream",
  "its": "application/its+xml",
  "jade": "text/jade",
  "jar": "application/java-archive",
  "jhc": "image/jphc",
  "jls": "image/jls",
  "jp2": "image/jp2",
  "jpe": "image/jpeg",
  "jpeg": "image/jpeg",
  "jpf": "image/jpx",
  "jpg": "image/jpeg",
  "jpg2": "image/jp2",
  "jpgm": "image/jpm",
  "jpgv": "video/jpeg",
  "jph": "image/jph",
  "jpm": "image/jpm",
  "jpx": "image/jpx",
  "js": "text/javascript",
  "json": "application/json",
  "json5": "application/json5",
  "jsonld": "application/ld+json",
  "jsonml": "application/jsonml+json",
  "jsx": "text/jsx",
  "jt": "model/jt",
  "jxr": "image/jxr",
  "jxra": "image/jxra",
  "jxrs": "image/jxrs",
  "jxs": "image/jxs",
  "jxsc": "image/jxsc",
  "jxsi": "image/jxsi",
  "jxss": "image/jxss",
  "kar": "audio/midi",
  "ktx": "image/ktx",
  "ktx2": "image/ktx2",
  "less": "text/less",
  "lgr": "application/lgr+xml",
  "list": "text/plain",
  "litcoffee": "text/coffeescript",
  "log": "text/plain",
  "lostxml": "application/lost+xml",
  "lrf": "application/octet-stream",
  "m1v": "video/mpeg",
  "m21": "application/mp21",
  "m2a": "audio/mpeg",
  "m2v": "video/mpeg",
  "m3a": "audio/mpeg",
  "m4a": "audio/mp4",
  "m4p": "application/mp4",
  "m4s": "video/iso.segment",
  "ma": "application/mathematica",
  "mads": "application/mads+xml",
  "maei": "application/mmt-aei+xml",
  "man": "text/troff",
  "manifest": "text/cache-manifest",
  "map": "application/json",
  "mar": "application/octet-stream",
  "markdown": "text/markdown",
  "mathml": "application/mathml+xml",
  "mb": "application/mathematica",
  "mbox": "application/mbox",
  "md": "text/markdown",
  "mdx": "text/mdx",
  "me": "text/troff",
  "mesh": "model/mesh",
  "meta4": "application/metalink4+xml",
  "metalink": "application/metalink+xml",
  "mets": "application/mets+xml",
  "mft": "application/rpki-manifest",
  "mid": "audio/midi",
  "midi": "audio/midi",
  "mime": "message/rfc822",
  "mj2": "video/mj2",
  "mjp2": "video/mj2",
  "mjs": "text/javascript",
  "mml": "text/mathml",
  "mods": "application/mods+xml",
  "mov": "video/quicktime",
  "mp2": "audio/mpeg",
  "mp21": "application/mp21",
  "mp2a": "audio/mpeg",
  "mp3": "audio/mpeg",
  "mp4": "video/mp4",
  "mp4a": "audio/mp4",
  "mp4s": "application/mp4",
  "mp4v": "video/mp4",
  "mpd": "application/dash+xml",
  "mpe": "video/mpeg",
  "mpeg": "video/mpeg",
  "mpf": "application/media-policy-dataset+xml",
  "mpg": "video/mpeg",
  "mpg4": "video/mp4",
  "mpga": "audio/mpeg",
  "mpp": "application/dash-patch+xml",
  "mrc": "application/marc",
  "mrcx": "application/marcxml+xml",
  "ms": "text/troff",
  "mscml": "application/mediaservercontrol+xml",
  "msh": "model/mesh",
  "msi": "application/octet-stream",
  "msix": "application/msix",
  "msixbundle": "application/msixbundle",
  "msm": "application/octet-stream",
  "msp": "application/octet-stream",
  "mtl": "model/mtl",
  "musd": "application/mmt-usd+xml",
  "mxf": "application/mxf",
  "mxmf": "audio/mobile-xmf",
  "mxml": "application/xv+xml",
  "n3": "text/n3",
  "nb": "application/mathematica",
  "nq": "application/n-quads",
  "nt": "application/n-triples",
  "obj": "model/obj",
  "oda": "application/oda",
  "oga": "audio/ogg",
  "ogg": "audio/ogg",
  "ogv": "video/ogg",
  "ogx": "application/ogg",
  "omdoc": "application/omdoc+xml",
  "onepkg": "application/onenote",
  "onetmp": "application/onenote",
  "onetoc": "application/onenote",
  "onetoc2": "application/onenote",
  "opf": "application/oebps-package+xml",
  "opus": "audio/ogg",
  "otf": "font/otf",
  "owl": "application/rdf+xml",
  "oxps": "application/oxps",
  "p10": "application/pkcs10",
  "p7c": "application/pkcs7-mime",
  "p7m": "application/pkcs7-mime",
  "p7s": "application/pkcs7-signature",
  "p8": "application/pkcs8",
  "pdf": "application/pdf",
  "pfr": "application/font-tdpfr",
  "pgp": "application/pgp-encrypted",
  "pkg": "application/octet-stream",
  "pki": "application/pkixcmp",
  "pkipath": "application/pkix-pkipath",
  "pls": "application/pls+xml",
  "png": "image/png",
  "prc": "model/prc",
  "prf": "application/pics-rules",
  "provx": "application/provenance+xml",
  "ps": "application/postscript",
  "pskcxml": "application/pskc+xml",
  "pti": "image/prs.pti",
  "qt": "video/quicktime",
  "raml": "application/raml+yaml",
  "rapd": "application/route-apd+xml",
  "rdf": "application/rdf+xml",
  "relo": "application/p2p-overlay+xml",
  "rif": "application/reginfo+xml",
  "rl": "application/resource-lists+xml",
  "rld": "application/resource-lists-diff+xml",
  "rmi": "audio/midi",
  "rnc": "application/relax-ng-compact-syntax",
  "rng": "application/xml",
  "roa": "application/rpki-roa",
  "roff": "text/troff",
  "rq": "application/sparql-query",
  "rs": "application/rls-services+xml",
  "rsat": "application/atsc-rsat+xml",
  "rsd": "application/rsd+xml",
  "rsheet": "application/urc-ressheet+xml",
  "rss": "application/rss+xml",
  "rtf": "text/rtf",
  "rtx": "text/richtext",
  "rusd": "application/route-usd+xml",
  "s3m": "audio/s3m",
  "sbml": "application/sbml+xml",
  "scq": "application/scvp-cv-request",
  "scs": "application/scvp-cv-response",
  "sdp": "application/sdp",
  "senmlx": "application/senml+xml",
  "sensmlx": "application/sensml+xml",
  "ser": "application/java-serialized-object",
  "setpay": "application/set-payment-initiation",
  "setreg": "application/set-registration-initiation",
  "sgi": "image/sgi",
  "sgm": "text/sgml",
  "sgml": "text/sgml",
  "shex": "text/shex",
  "shf": "application/shf+xml",
  "shtml": "text/html",
  "sieve": "application/sieve",
  "sig": "application/pgp-signature",
  "sil": "audio/silk",
  "silo": "model/mesh",
  "siv": "application/sieve",
  "slim": "text/slim",
  "slm": "text/slim",
  "sls": "application/route-s-tsid+xml",
  "smi": "application/smil+xml",
  "smil": "application/smil+xml",
  "snd": "audio/basic",
  "so": "application/octet-stream",
  "spdx": "text/spdx",
  "spp": "application/scvp-vp-response",
  "spq": "application/scvp-vp-request",
  "spx": "audio/ogg",
  "sql": "application/sql",
  "sru": "application/sru+xml",
  "srx": "application/sparql-results+xml",
  "ssdl": "application/ssdl+xml",
  "ssml": "application/ssml+xml",
  "stk": "application/hyperstudio",
  "stl": "model/stl",
  "stpx": "model/step+xml",
  "stpxz": "model/step-xml+zip",
  "stpz": "model/step+zip",
  "styl": "text/stylus",
  "stylus": "text/stylus",
  "svg": "image/svg+xml",
  "svgz": "image/svg+xml",
  "swidtag": "application/swid+xml",
  "t": "text/troff",
  "t38": "image/t38",
  "td": "application/urc-targetdesc+xml",
  "tei": "application/tei+xml",
  "teicorpus": "application/tei+xml",
  "text": "text/plain",
  "tfi": "application/thraud+xml",
  "tfx": "image/tiff-fx",
  "tif": "image/tiff",
  "tiff": "image/tiff",
  "toml": "application/toml",
  "tr": "text/troff",
  "trig": "application/trig",
  "ts": "video/mp2t",
  "tsd": "application/timestamped-data",
  "tsv": "text/tab-separated-values",
  "ttc": "font/collection",
  "ttf": "font/ttf",
  "ttl": "text/turtle",
  "ttml": "application/ttml+xml",
  "txt": "text/plain",
  "u3d": "model/u3d",
  "u8dsn": "message/global-delivery-status",
  "u8hdr": "message/global-headers",
  "u8mdn": "message/global-disposition-notification",
  "u8msg": "message/global",
  "ubj": "application/ubjson",
  "uri": "text/uri-list",
  "uris": "text/uri-list",
  "urls": "text/uri-list",
  "vcard": "text/vcard",
  "vrml": "model/vrml",
  "vtt": "text/vtt",
  "vxml": "application/voicexml+xml",
  "war": "application/java-archive",
  "wasm": "application/wasm",
  "wav": "audio/wav",
  "weba": "audio/webm",
  "webm": "video/webm",
  "webmanifest": "application/manifest+json",
  "webp": "image/webp",
  "wgsl": "text/wgsl",
  "wgt": "application/widget",
  "wif": "application/watcherinfo+xml",
  "wmf": "image/wmf",
  "woff": "font/woff",
  "woff2": "font/woff2",
  "wrl": "model/vrml",
  "wsdl": "application/wsdl+xml",
  "wspolicy": "application/wspolicy+xml",
  "x3d": "model/x3d+xml",
  "x3db": "model/x3d+fastinfoset",
  "x3dbz": "model/x3d+binary",
  "x3dv": "model/x3d-vrml",
  "x3dvz": "model/x3d+vrml",
  "x3dz": "model/x3d+xml",
  "xaml": "application/xaml+xml",
  "xav": "application/xcap-att+xml",
  "xca": "application/xcap-caps+xml",
  "xcs": "application/calendar+xml",
  "xdf": "application/xcap-diff+xml",
  "xdssc": "application/dssc+xml",
  "xel": "application/xcap-el+xml",
  "xenc": "application/xenc+xml",
  "xer": "application/patch-ops-error+xml",
  "xfdf": "application/xfdf",
  "xht": "application/xhtml+xml",
  "xhtml": "application/xhtml+xml",
  "xhvml": "application/xv+xml",
  "xlf": "application/xliff+xml",
  "xm": "audio/xm",
  "xml": "text/xml",
  "xns": "application/xcap-ns+xml",
  "xop": "application/xop+xml",
  "xpl": "application/xproc+xml",
  "xsd": "application/xml",
  "xsf": "application/prs.xsf+xml",
  "xsl": "application/xml",
  "xslt": "application/xml",
  "xspf": "application/xspf+xml",
  "xvm": "application/xv+xml",
  "xvml": "application/xv+xml",
  "yaml": "text/yaml",
  "yang": "application/yang",
  "yin": "application/yin+xml",
  "yml": "text/yaml",
  "zip": "application/zip"
};

function lookup(extn) {
	let tmp = ('' + extn).trim().toLowerCase();
	let idx = tmp.lastIndexOf('.');
	return mimes[!~idx ? tmp : tmp.substring(++idx)];
}

const noop$1 = () => {};

function isMatch(uri, arr) {
	for (let i=0; i < arr.length; i++) {
		if (arr[i].test(uri)) return true;
	}
}

function toAssume(uri, extns) {
	let i=0, x, len=uri.length - 1;
	if (uri.charCodeAt(len) === 47) {
		uri = uri.substring(0, len);
	}

	let arr=[], tmp=`${uri}/index`;
	for (; i < extns.length; i++) {
		x = extns[i] ? `.${extns[i]}` : '';
		if (uri) arr.push(uri + x);
		arr.push(tmp + x);
	}

	return arr;
}

function viaCache(cache, uri, extns) {
	let i=0, data, arr=toAssume(uri, extns);
	for (; i < arr.length; i++) {
		if (data = cache[arr[i]]) return data;
	}
}

function viaLocal(dir, isEtag, uri, extns) {
	let i=0, arr=toAssume(uri, extns);
	let abs, stats, name, headers;
	for (; i < arr.length; i++) {
		abs = normalize(
			join(dir, name=arr[i])
		);

		if (abs.startsWith(dir) && fs.existsSync(abs)) {
			stats = fs.statSync(abs);
			if (stats.isDirectory()) continue;
			headers = toHeaders(name, stats, isEtag);
			headers['Cache-Control'] = isEtag ? 'no-cache' : 'no-store';
			return { abs, stats, headers };
		}
	}
}

function is404(req, res) {
	return (res.statusCode=404,res.end());
}

function send(req, res, file, stats, headers) {
	let code=200, tmp, opts={};
	headers = { ...headers };

	for (let key in headers) {
		tmp = res.getHeader(key);
		if (tmp) headers[key] = tmp;
	}

	if (tmp = res.getHeader('content-type')) {
		headers['Content-Type'] = tmp;
	}

	if (req.headers.range) {
		code = 206;
		let [x, y] = req.headers.range.replace('bytes=', '').split('-');
		let end = opts.end = parseInt(y, 10) || stats.size - 1;
		let start = opts.start = parseInt(x, 10) || 0;

		if (end >= stats.size) {
			end = stats.size - 1;
		}

		if (start >= stats.size) {
			res.setHeader('Content-Range', `bytes */${stats.size}`);
			res.statusCode = 416;
			return res.end();
		}

		headers['Content-Range'] = `bytes ${start}-${end}/${stats.size}`;
		headers['Content-Length'] = (end - start + 1);
		headers['Accept-Ranges'] = 'bytes';
	}

	res.writeHead(code, headers);
	fs.createReadStream(file, opts).pipe(res);
}

const ENCODING = {
	'.br': 'br',
	'.gz': 'gzip',
};

function toHeaders(name, stats, isEtag) {
	let enc = ENCODING[name.slice(-3)];

	let ctype = lookup(name.slice(0, enc && -3)) || '';
	if (ctype === 'text/html') ctype += ';charset=utf-8';

	let headers = {
		'Content-Length': stats.size,
		'Content-Type': ctype,
		'Last-Modified': stats.mtime.toUTCString(),
	};

	if (enc) headers['Content-Encoding'] = enc;
	if (isEtag) headers['ETag'] = `W/"${stats.size}-${stats.mtime.getTime()}"`;

	return headers;
}

function sirv (dir, opts={}) {
	dir = resolve(dir || '.');

	let isNotFound = opts.onNoMatch || is404;
	let setHeaders = opts.setHeaders || noop$1;

	let extensions = opts.extensions || ['html', 'htm'];
	let gzips = opts.gzip && extensions.map(x => `${x}.gz`).concat('gz');
	let brots = opts.brotli && extensions.map(x => `${x}.br`).concat('br');

	const FILES = {};

	let fallback = '/';
	let isEtag = !!opts.etag;
	let isSPA = !!opts.single;
	if (typeof opts.single === 'string') {
		let idx = opts.single.lastIndexOf('.');
		fallback += !!~idx ? opts.single.substring(0, idx) : opts.single;
	}

	let ignores = [];
	if (opts.ignores !== false) {
		ignores.push(/[/]([A-Za-z\s\d~$._-]+\.\w+){1,}$/); // any extn
		if (opts.dotfiles) ignores.push(/\/\.\w/);
		else ignores.push(/\/\.well-known/);
		[].concat(opts.ignores || []).forEach(x => {
			ignores.push(new RegExp(x, 'i'));
		});
	}

	let cc = opts.maxAge != null && `public,max-age=${opts.maxAge}`;
	if (cc && opts.immutable) cc += ',immutable';
	else if (cc && opts.maxAge === 0) cc += ',must-revalidate';

	if (!opts.dev) {
		totalist(dir, (name, abs, stats) => {
			if (/\.well-known[\\+\/]/.test(name)) ; // keep
			else if (!opts.dotfiles && /(^\.|[\\+|\/+]\.)/.test(name)) return;

			let headers = toHeaders(name, stats, isEtag);
			if (cc) headers['Cache-Control'] = cc;

			FILES['/' + name.normalize().replace(/\\+/g, '/')] = { abs, stats, headers };
		});
	}

	let lookup = opts.dev ? viaLocal.bind(0, dir + sep, isEtag) : viaCache.bind(0, FILES);

	return function (req, res, next) {
		let extns = [''];
		let pathname = parse$1(req).pathname;
		let val = req.headers['accept-encoding'] || '';
		if (gzips && val.includes('gzip')) extns.unshift(...gzips);
		if (brots && /(br|brotli)/i.test(val)) extns.unshift(...brots);
		extns.push(...extensions); // [...br, ...gz, orig, ...exts]

		if (pathname.indexOf('%') !== -1) {
			try { pathname = decodeURI(pathname); }
			catch (err) { /* malform uri */ }
		}

		let data = lookup(pathname, extns) || isSPA && !isMatch(pathname, ignores) && lookup(fallback, extns);
		if (!data) return next ? next() : isNotFound(req, res);

		if (isEtag && req.headers['if-none-match'] === data.headers['ETag']) {
			res.writeHead(304);
			return res.end();
		}

		if (gzips || brots) {
			res.setHeader('Vary', 'Accept-Encoding');
		}

		setHeaders(res, pathname, data.stats);
		send(req, res, data.abs, data.stats, data.headers);
	};
}

/**
 * @param {string|RegExp} input The route pattern
 * @param {boolean} [loose] Allow open-ended matching. Ignored with `RegExp` input.
 */
function parse(input, loose) {
	if (input instanceof RegExp) return { keys:false, pattern:input };
	var c, o, tmp, ext, keys=[], pattern='', arr = input.split('/');
	arr[0] || arr.shift();

	while (tmp = arr.shift()) {
		c = tmp[0];
		if (c === '*') {
			keys.push(c);
			pattern += tmp[1] === '?' ? '(?:/(.*))?' : '/(.*)';
		} else if (c === ':') {
			o = tmp.indexOf('?', 1);
			ext = tmp.indexOf('.', 1);
			keys.push( tmp.substring(1, !!~o ? o : !!~ext ? ext : tmp.length) );
			pattern += !!~o && !~ext ? '(?:/([^/]+?))?' : '/([^/]+?)';
			if (!!~ext) pattern += (!!~o ? '?' : '') + '\\' + tmp.substring(ext);
		} else {
			pattern += '/' + tmp;
		}
	}

	return {
		keys: keys,
		pattern: new RegExp('^' + pattern + (loose ? '(?=$|\/)' : '\/?$'), 'i')
	};
}

const MAP = {
	"": 0,
	GET: 1,
	HEAD: 2,
	PATCH: 3,
	OPTIONS: 4,
	CONNECT: 5,
	DELETE: 6,
	TRACE: 7,
	POST: 8,
	PUT: 9,
};

class Trouter {
	constructor() {
		this.routes = [];

		this.all = this.add.bind(this, '');
		this.get = this.add.bind(this, 'GET');
		this.head = this.add.bind(this, 'HEAD');
		this.patch = this.add.bind(this, 'PATCH');
		this.options = this.add.bind(this, 'OPTIONS');
		this.connect = this.add.bind(this, 'CONNECT');
		this.delete = this.add.bind(this, 'DELETE');
		this.trace = this.add.bind(this, 'TRACE');
		this.post = this.add.bind(this, 'POST');
		this.put = this.add.bind(this, 'PUT');
	}

	use(route, ...fns) {
		let handlers = [].concat.apply([], fns);
		let { keys, pattern } = parse(route, true);
		this.routes.push({ keys, pattern, method: '', handlers, midx: MAP[''] });
		return this;
	}

	add(method, route, ...fns) {
		let { keys, pattern } = parse(route);
		let handlers = [].concat.apply([], fns);
		this.routes.push({ keys, pattern, method, handlers, midx: MAP[method] });
		return this;
	}

	find(method, url) {
		let midx = MAP[method];
		let isHEAD = (midx === 2);
		let i=0, j=0, k, tmp, arr=this.routes;
		let matches=[], params={}, handlers=[];
		for (; i < arr.length; i++) {
			tmp = arr[i];
			if (tmp.midx === midx  || tmp.midx === 0 || (isHEAD && tmp.midx===1) ) {
				if (tmp.keys === false) {
					matches = tmp.pattern.exec(url);
					if (matches === null) continue;
					if (matches.groups !== void 0) for (k in matches.groups) params[k]=matches.groups[k];
					tmp.handlers.length > 1 ? (handlers=handlers.concat(tmp.handlers)) : handlers.push(tmp.handlers[0]);
				} else if (tmp.keys.length > 0) {
					matches = tmp.pattern.exec(url);
					if (matches === null) continue;
					for (j=0; j < tmp.keys.length;) params[tmp.keys[j]]=matches[++j];
					tmp.handlers.length > 1 ? (handlers=handlers.concat(tmp.handlers)) : handlers.push(tmp.handlers[0]);
				} else if (tmp.pattern.test(url)) {
					tmp.handlers.length > 1 ? (handlers=handlers.concat(tmp.handlers)) : handlers.push(tmp.handlers[0]);
				}
			} // else not a match
		}

		return { params, handlers };
	}
}

function onError(err, req, res) {
	let code = typeof err.status === 'number' && err.status;
	code = res.statusCode = (code && code >= 100 ? code : 500);
	if (typeof err === 'string' || Buffer.isBuffer(err)) res.end(err);
	else res.end(err.message || http.STATUS_CODES[code]);
}

const mount = fn => fn instanceof Polka ? fn.attach : fn;

class Polka extends Trouter {
	constructor(opts={}) {
		super();
		this.parse = parse$1;
		this.server = opts.server;
		this.handler = this.handler.bind(this);
		this.onError = opts.onError || onError; // catch-all handler
		this.onNoMatch = opts.onNoMatch || this.onError.bind(null, { status: 404 });
		this.attach = (req, res) => setImmediate(this.handler, req, res);
	}

	use(base, ...fns) {
		if (base === '/') {
			super.use(base, fns.map(mount));
		} else if (typeof base === 'function' || base instanceof Polka) {
			super.use('/', [base, ...fns].map(mount));
		} else {
			super.use(base,
				(req, _, next) => {
					if (typeof base === 'string') {
						let len = base.length;
						base.startsWith('/') || len++;
						req.url = req.url.substring(len) || '/';
						req.path = req.path.substring(len) || '/';
					} else {
						req.url = req.url.replace(base, '') || '/';
						req.path = req.path.replace(base, '') || '/';
					}
					if (req.url.charAt(0) !== '/') {
						req.url = '/' + req.url;
					}
					next();
				},
				fns.map(mount),
				(req, _, next) => {
					req.path = req._parsedUrl.pathname;
					req.url = req.path + req._parsedUrl.search;
					next();
				}
			);
		}
		return this; // chainable
	}

	listen() {
		(this.server = this.server || http.createServer()).on('request', this.attach);
		this.server.listen.apply(this.server, arguments);
		return this;
	}

	handler(req, res, next) {
		let info = this.parse(req), path = info.pathname;
		let obj = this.find(req.method, req.path=path);

		req.url = path + info.search;
		req.originalUrl = req.originalUrl || req.url;
		req.query = info.query || {};
		req.search = info.search;
		req.params = obj.params;

		if (path.length > 1 && path.indexOf('%', 1) !== -1) {
			for (let k in req.params) {
				try { req.params[k] = decodeURIComponent(req.params[k]); }
				catch (e) { /* malform uri segment */ }
			}
		}

		let i=0, arr=obj.handlers.concat(this.onNoMatch), len=arr.length;
		let loop = async () => res.finished || (i < len) && arr[i++](req, res, next);
		(next = next || (err => err ? this.onError(err, req, res, next) : loop().catch(next)))(); // init
	}
}

function polka (opts) {
	return new Polka(opts);
}

function noop() {}

var defaultParseOptions = {
  decodeValues: true,
  map: false,
  silent: false,
  split: "auto", // auto = split strings but not arrays
};

function isForbiddenKey(key) {
  return typeof key !== "string" || key in {};
}

function createNullObj() {
  return Object.create(null);
}

function isNonEmptyString(str) {
  return typeof str === "string" && !!str.trim();
}

function parseString(setCookieValue, options) {
  var parts = setCookieValue.split(";").filter(isNonEmptyString);

  var nameValuePairStr = parts.shift();
  if (!nameValuePairStr) {
    return null;
  }
  var parsed = parseNameValuePair(nameValuePairStr);
  var name = parsed.name;
  var value = parsed.value;

  options = options
    ? Object.assign({}, defaultParseOptions, options)
    : defaultParseOptions;

  if (isForbiddenKey(name)) {
    return null;
  }

  try {
    value = options.decodeValues ? decodeURIComponent(value) : value; // decode cookie value
  } catch (e) {
    console.error(
      "set-cookie-parser: failed to decode cookie value. Set options.decodeValues=false to disable decoding.",
      e
    );
  }

  var cookie = createNullObj();
  cookie.name = name;
  cookie.value = value;

  parts.forEach(function (part) {
    var sides = part.split("=");
    var key = sides.shift().trim().toLowerCase();
    if (isForbiddenKey(key)) {
      return;
    }
    var value = sides.join("=").trim();
    if (key === "expires") {
      cookie.expires = new Date(value);
    } else if (key === "max-age") {
      var n = parseInt(value, 10);
      if (!Number.isNaN(n)) cookie.maxAge = n;
    } else if (key === "secure") {
      cookie.secure = true;
    } else if (key === "httponly") {
      cookie.httpOnly = true;
    } else if (key === "samesite") {
      cookie.sameSite = value;
    } else if (key === "partitioned") {
      cookie.partitioned = true;
    } else if (key) {
      cookie[key] = value;
    }
  });

  return cookie;
}

function parseNameValuePair(nameValuePairStr) {
  // Parses name-value-pair according to rfc6265bis draft

  var name = "";
  var value = "";
  var nameValueArr = nameValuePairStr.split("=");
  if (nameValueArr.length > 1) {
    name = nameValueArr.shift();
    value = nameValueArr.join("="); // everything after the first =, joined by a "=" if there was more than one part
  } else {
    value = nameValuePairStr;
  }

  return { name: name, value: value };
}

function parseSetCookie(input, options) {
  options = options
    ? Object.assign({}, defaultParseOptions, options)
    : defaultParseOptions;

  if (!input) {
    if (!options.map) {
      return [];
    } else {
      return createNullObj();
    }
  }

  if (input.headers) {
    if (typeof input.headers.getSetCookie === "function") {
      // for fetch responses - they combine headers of the same type in the headers array,
      // but getSetCookie returns an uncombined array
      input = input.headers.getSetCookie();
    } else if (input.headers["set-cookie"]) {
      // fast-path for node.js (which automatically normalizes header names to lower-case)
      input = input.headers["set-cookie"];
    } else {
      // slow-path for other environments - see #25
      var sch =
        input.headers[
          Object.keys(input.headers).find(function (key) {
            return key.toLowerCase() === "set-cookie";
          })
        ];
      // warn if called on a request-like object with a cookie header rather than a set-cookie header - see #34, 36
      if (!sch && input.headers.cookie && !options.silent) {
        console.warn(
          "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
        );
      }
      input = sch;
    }
  }

  var split = options.split;
  var isArray = Array.isArray(input);

  if (split === "auto") {
    split = !isArray;
  }

  if (!isArray) {
    input = [input];
  }

  input = input.filter(isNonEmptyString);

  if (split) {
    input = input.map(splitCookiesString).flat();
  }

  if (!options.map) {
    return input
      .map(function (str) {
        return parseString(str, options);
      })
      .filter(Boolean);
  } else {
    var cookies = createNullObj();
    return input.reduce(function (cookies, str) {
      var cookie = parseString(str, options);
      if (cookie && !isForbiddenKey(cookie.name)) {
        cookies[cookie.name] = cookie;
      }
      return cookies;
    }, cookies);
  }
}

/*
  Set-Cookie header field-values are sometimes comma joined in one string. This splits them without choking on commas
  that are within a single set-cookie field-value, such as in the Expires portion.

  This is uncommon, but explicitly allowed - see https://tools.ietf.org/html/rfc2616#section-4.2
  Node.js does this for every header *except* set-cookie - see https://github.com/nodejs/node/blob/d5e363b77ebaf1caf67cd7528224b651c86815c1/lib/_http_incoming.js#L128
  React Native's fetch does this for *every* header, including set-cookie.

  Based on: https://github.com/google/j2objc/commit/16820fdbc8f76ca0c33472810ce0cb03d20efe25
  Credits to: https://github.com/tomball for original and https://github.com/chrusart for JavaScript implementation
*/
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString;
  }
  if (typeof cookiesString !== "string") {
    return [];
  }

  var cookiesStrings = [];
  var pos = 0;
  var start;
  var ch;
  var lastComma;
  var nextStart;
  var cookiesSeparatorFound;

  function skipWhitespace() {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  }

  function notSpecialChar() {
    ch = cookiesString.charAt(pos);

    return ch !== "=" && ch !== ";" && ch !== ",";
  }

  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;

    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        // ',' is a cookie separator if we have later first '=', not ';' or ','
        lastComma = pos;
        pos += 1;

        skipWhitespace();
        nextStart = pos;

        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }

        // currently special character
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          // we found cookies separator
          cookiesSeparatorFound = true;
          // pos is inside the next cookie, so back up and return it.
          pos = nextStart;
          cookiesStrings.push(cookiesString.substring(start, lastComma));
          start = pos;
        } else {
          // in param ',' or param separator ';',
          // we continue from that comma
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }

    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
    }
  }

  return cookiesStrings;
}

// named export for CJS
parseSetCookie.parseSetCookie = parseSetCookie;
// for backwards compatibility
parseSetCookie.parse = parseSetCookie;
parseSetCookie.parseString = parseString;
parseSetCookie.splitCookiesString = splitCookiesString;

/** @import { RemoteForm } from '@sveltejs/kit' */
/** @import { BinaryFormMeta, InternalRemoteFormIssue } from 'types' */
/** @import { StandardSchemaV1 } from '@standard-schema/spec' */


new TextDecoder();

/**
 * Reads all `Set-Cookie` headers as separate values. `Headers.get('set-cookie')`
 * collapses them into a single comma-joined string that browsers cannot parse, so
 * we use `Headers.getSetCookie()` where available and fall back to splitting the
 * joined string otherwise.
 *
 * TODO 3.0 `getSetCookie` is available in Node 19.7+; once we drop support for
 * older versions we can use it directly and remove the `splitCookiesString` fallback
 * @param {Headers} headers
 * @returns {string[]}
 */
function get_set_cookies(headers) {
	if (typeof headers.getSetCookie === 'function') {
		return headers.getSetCookie();
	}

	const set_cookie = headers.get('set-cookie');
	return set_cookie ? splitCookiesString(set_cookie) : [];
}

/**
 * @param {import('http').IncomingMessage} req
 * @param {number} [body_size_limit]
 */
function get_raw_body(req, body_size_limit) {
	const h = req.headers;

	if (!h['content-type']) {
		return null;
	}

	const content_length = Number(h['content-length']);
	const has_content_length = Number.isFinite(content_length);

	// check if no request body
	if (
		(req.httpVersionMajor === 1 && !has_content_length && h['transfer-encoding'] == null) ||
		content_length === 0
	) {
		return null;
	}

	if (req.destroyed) {
		const readable = new ReadableStream();
		void readable.cancel();
		return readable;
	}

	let size = 0;
	let cancelled = false;

	return new ReadableStream({
		start(controller) {
			if (body_size_limit !== undefined && has_content_length && content_length > body_size_limit) {
				let message = `Content-length of ${content_length} exceeds limit of ${body_size_limit} bytes.`;

				if (body_size_limit === 0) {
					// https://github.com/sveltejs/kit/pull/11589
					// TODO this exists to aid migration — remove in a future version
					message += ' To disable body size limits, specify Infinity rather than 0.';
				}

				const error = new SvelteKitError(413, 'Payload Too Large', message);

				controller.error(error);
				return;
			}

			req.on('error', (error) => {
				cancelled = true;
				controller.error(error);
			});

			req.on('end', () => {
				if (cancelled) return;
				controller.close();
			});

			req.on('data', (chunk) => {
				if (cancelled) return;

				size += chunk.length;

				if (body_size_limit !== undefined && size > body_size_limit) {
					cancelled = true;

					const message = `request body size exceeded BODY_SIZE_LIMIT of ${body_size_limit}`;

					const error = new SvelteKitError(413, 'Payload Too Large', message);
					controller.error(error);

					return;
				}

				if (has_content_length && size > content_length) {
					cancelled = true;

					const message = `request body size exceeded content-length of ${content_length}`;

					const error = new SvelteKitError(413, 'Payload Too Large', message);
					controller.error(error);

					return;
				}

				controller.enqueue(chunk);

				if (controller.desiredSize === null || controller.desiredSize <= 0) {
					req.pause();
				}
			});
		},

		pull() {
			req.resume();
		},

		cancel(reason) {
			cancelled = true;
			req.destroy(reason);
		}
	});
}

/**
 * @param {{
 *   request: import('http').IncomingMessage;
 *   base: string;
 *   bodySizeLimit?: number;
 * }} options
 * @returns {Promise<Request>}
 */
// TODO 3.0 make the signature synchronous?
// eslint-disable-next-line @typescript-eslint/require-await
async function getRequest({ request, base, bodySizeLimit }) {
	let headers = /** @type {Record<string, string>} */ (request.headers);
	if (request.httpVersionMajor >= 2) {
		// the Request constructor rejects headers with ':' in the name
		headers = Object.assign({}, headers);
		// https://www.rfc-editor.org/rfc/rfc9113.html#section-8.3.1-2.3.5
		if (headers[':authority']) {
			headers.host = headers[':authority'];
		}
		delete headers[':authority'];
		delete headers[':method'];
		delete headers[':path'];
		delete headers[':scheme'];
	}

	// TODO: Whenever Node >=22 is minimum supported version, we can use `request.readableAborted`
	// @see https://github.com/nodejs/node/blob/5cf3c3e24c7257a0c6192ed8ef71efec8ddac22b/lib/internal/streams/readable.js#L1443-L1453
	const controller = new AbortController();
	let errored = false;
	let end_emitted = false;
	request.once('error', () => (errored = true));
	request.once('end', () => (end_emitted = true));
	request.once('close', () => {
		if ((errored || request.destroyed) && !end_emitted) {
			controller.abort();
		}
	});

	return new Request(base + request.url, {
		// @ts-expect-error
		duplex: 'half',
		method: request.method,
		headers: Object.entries(headers),
		signal: controller.signal,
		body:
			request.method === 'GET' || request.method === 'HEAD'
				? undefined
				: get_raw_body(request, bodySizeLimit)
	});
}

/**
 * @param {import('http').ServerResponse} res
 * @param {Response} response
 * @returns {Promise<void>}
 */
// TODO 3.0 make the signature synchronous?
// eslint-disable-next-line @typescript-eslint/require-await
async function setResponse(res, response) {
	for (const [key, value] of response.headers) {
		try {
			res.setHeader(key, key === 'set-cookie' ? get_set_cookies(response.headers) : value);
		} catch (error) {
			res.getHeaderNames().forEach((name) => res.removeHeader(name));
			res.writeHead(500).end(String(error));
			return;
		}
	}

	res.writeHead(response.status);

	if (!response.body) {
		res.end();
		return;
	}

	if (response.body.locked) {
		res.end(
			'Fatal error: Response body is locked. ' +
				"This can happen when the response was already read (for example through 'response.json()' or 'response.text()')."
		);
		return;
	}

	const reader = response.body.getReader();

	if (res.destroyed) {
		void reader.cancel();
		return;
	}

	const cancel = (/** @type {Error|undefined} */ error) => {
		res.off('close', cancel);
		res.off('error', cancel);

		// If the reader has already been interrupted with an error earlier,
		// then it will appear here, it is useless, but it needs to be catch.
		reader.cancel(error).catch(noop);
		if (error) res.destroy(error);
	};

	res.on('close', cancel);
	res.on('error', cancel);

	void next();
	async function next() {
		try {
			for (;;) {
				const { done, value } = await reader.read();

				if (done) break;

				if (!res.write(value)) {
					res.once('drain', next);
					return;
				}
			}
			res.end();
		} catch (error) {
			cancel(error instanceof Error ? error : new Error(String(error)));
		}
	}
}

/**
 * Converts a file on disk to a readable stream
 * @param {string} file
 * @returns {ReadableStream}
 * @since 2.4.0
 */
function createReadableStream(file) {
	return /** @type {ReadableStream} */ (Readable.toWeb(createReadStream(file)));
}

/**
 * Parses the given value into number of bytes.
 *
 * @param {string} value - Size in bytes. Can also be specified with a unit suffix kilobytes (K), megabytes (M), or gigabytes (G).
 * @returns {number}
 */
function parse_as_bytes(value) {
	const multiplier =
		{
			K: 1024,
			M: 1024 * 1024,
			G: 1024 * 1024 * 1024
		}[value[value.length - 1]?.toUpperCase()] ?? 1;
	return Number(multiplier != 1 ? value.substring(0, value.length - 1) : value) * multiplier;
}

/**
 * Parses and validates an origin URL.
 *
 * @param {string | undefined} value - Origin URL with http:// or https:// protocol
 * @returns {string | undefined} The validated origin, or undefined if value is undefined
 * @throws {Error} If value is provided but invalid
 */
function parse_origin(value) {
	if (value === undefined) {
		return undefined;
	}

	const trimmed = value.trim();

	let url;
	try {
		url = new URL(trimmed);
	} catch (error) {
		throw new Error(
			`Invalid ORIGIN: '${trimmed}'. ` +
				`ORIGIN must be a valid URL with http:// or https:// protocol. ` +
				`For example: 'http://localhost:3000' or 'https://my.site'`,
			{ cause: error }
		);
	}

	if (url.protocol !== 'http:' && url.protocol !== 'https:') {
		throw new Error(
			`Invalid ORIGIN: '${trimmed}'. ` +
				`Only http:// and https:// protocols are supported. ` +
				`Received protocol: ${url.protocol}`
		);
	}

	return url.origin;
}

/**
 * Formats the address the server is listening on.
 *
 * @param {string | false} path
 * @param {string} host
 * @param {string | false} port
 * @param {import('node:net').AddressInfo | string | null} address
 * @returns {string}
 */
function format_listening_address(path, host, port, address) {
	if (path) {
		return path;
	}

	if (address && typeof address === 'object') {
		return format({
			protocol: 'http:',
			hostname: address.address,
			port: address.port
		});
	}

	return format({
		protocol: 'http:',
		hostname: host,
		port: String(port)
	});
}

const prerendered = new Set(["/en/about","/en/donate","/en/laoli","/en/recruit","/en/mizuki","/en/phantom","/en/sarkaz","/en/sami","/ja/about","/ja/donate","/ja/laoli","/ja/recruit","/ja/mizuki","/ja/phantom","/ja/sarkaz","/ja/sami","/zh/about","/zh/donate","/zh/laoli","/zh/recruit","/zh/mizuki","/zh/phantom","/zh/sarkaz","/zh/sami","/zh/stages/ISW-DF_开门请当心","/zh/stages/ISW-DF_开门请当心/__data.json","/en/stages/ISW-DF_Mind_the_Doors","/en/stages/ISW-DF_Mind_the_Doors/__data.json","/ja/stages/ISW-DF_敷居に注意を","/ja/stages/ISW-DF_敷居に注意を/__data.json","/zh/stages/ISW-DF_大盗当头","/zh/stages/ISW-DF_大盗当头/__data.json","/en/stages/ISW-DF_Theft_from_Above","/en/stages/ISW-DF_Theft_from_Above/__data.json","/ja/stages/ISW-DF_天翔ける怪盗・劇団篇","/ja/stages/ISW-DF_天翔ける怪盗・劇団篇/__data.json","/zh/stages/ISW-DF_恐怖传说","/zh/stages/ISW-DF_恐怖传说/__data.json","/en/stages/ISW-DF_Terrifying_Legends","/en/stages/ISW-DF_Terrifying_Legends/__data.json","/ja/stages/ISW-DF_恐怖の都市伝説","/ja/stages/ISW-DF_恐怖の都市伝説/__data.json","/zh/stages/ISW-DF_悦耳杀机","/zh/stages/ISW-DF_悦耳杀机/__data.json","/en/stages/ISW-DF_Fatal_Melodies","/en/stages/ISW-DF_Fatal_Melodies/__data.json","/ja/stages/ISW-DF_殺戮の調べ","/ja/stages/ISW-DF_殺戮の調べ/__data.json","/zh/stages/ISW-DF_寒渊惜别","/zh/stages/ISW-DF_寒渊惜别/__data.json","/en/stages/ISW-DF_A_Cold_Separation","/en/stages/ISW-DF_A_Cold_Separation/__data.json","/ja/stages/ISW-DF_酷寒の惜別","/ja/stages/ISW-DF_酷寒の惜別/__data.json","/zh/stages/ISW-DF_覆水难收","/zh/stages/ISW-DF_覆水难收/__data.json","/en/stages/ISW-DF_The_Point_of_No_Return","/en/stages/ISW-DF_The_Point_of_No_Return/__data.json","/ja/stages/ISW-DF_戻る道なし","/ja/stages/ISW-DF_戻る道なし/__data.json","/zh/stages/ISW-DF_别无所求","/zh/stages/ISW-DF_别无所求/__data.json","/en/stages/ISW-DF_All_I_Ask_of_You","/en/stages/ISW-DF_All_I_Ask_of_You/__data.json","/ja/stages/ISW-DF_最期の願い","/ja/stages/ISW-DF_最期の願い/__data.json","/zh/stages/ISW-DF_诸事不顺","/zh/stages/ISW-DF_诸事不顺/__data.json","/en/stages/ISW-DF_Twisted_Every_Way","/en/stages/ISW-DF_Twisted_Every_Way/__data.json","/ja/stages/ISW-DF_茶番の終わり","/ja/stages/ISW-DF_茶番の終わり/__data.json","/zh/stages/ISW-DF_再启新篇","/zh/stages/ISW-DF_再启新篇/__data.json","/en/stages/ISW-DF_New_Chapter","/en/stages/ISW-DF_New_Chapter/__data.json","/ja/stages/ISW-DF_新章の起稿","/ja/stages/ISW-DF_新章の起稿/__data.json","/zh/stages/ISW-DU_鸭爵的戏剧","/zh/stages/ISW-DU_鸭爵的戏剧/__data.json","/en/stages/ISW-DU_Duck_Lord's_Play","/en/stages/ISW-DU_Duck_Lord's_Play/__data.json","/ja/stages/ISW-DU_ダック卿のステージ","/ja/stages/ISW-DU_ダック卿のステージ/__data.json","/zh/stages/ISW-DU_鸭爵的宴会","/zh/stages/ISW-DU_鸭爵的宴会/__data.json","/en/stages/ISW-DU_Duck_Lord's_Party","/en/stages/ISW-DU_Duck_Lord's_Party/__data.json","/ja/stages/ISW-DU_ダック卿のパーティー","/ja/stages/ISW-DU_ダック卿のパーティー/__data.json","/zh/stages/ISW-DU_高普尼克之拳","/zh/stages/ISW-DU_高普尼克之拳/__data.json","/en/stages/ISW-DU_Gopnik's_Fist","/en/stages/ISW-DU_Gopnik's_Fist/__data.json","/ja/stages/ISW-DU_ゴプニクの挨拶","/ja/stages/ISW-DU_ゴプニクの挨拶/__data.json","/zh/stages/ISW-DU_这位乌萨斯人","/zh/stages/ISW-DU_这位乌萨斯人/__data.json","/en/stages/ISW-DU_This_Ursus_Man","/en/stages/ISW-DU_This_Ursus_Man/__data.json","/ja/stages/ISW-DU_ウルサスの漢","/ja/stages/ISW-DU_ウルサスの漢/__data.json","/zh/stages/ISW-SP_“骑士对决”","/zh/stages/ISW-SP_“骑士对决”/__data.json","/en/stages/ISW-SP_'Knights'_Duel'","/en/stages/ISW-SP_'Knights'_Duel'/__data.json","/ja/stages/ISW-SP_「騎士の対決」","/ja/stages/ISW-SP_「騎士の対決」/__data.json","/zh/stages/ISW-SP_邪异囚笼","/zh/stages/ISW-SP_邪异囚笼/__data.json","/en/stages/ISW-SP_Demonic_Cage","/en/stages/ISW-SP_Demonic_Cage/__data.json","/ja/stages/ISW-SP_異端の檻","/ja/stages/ISW-SP_異端の檻/__data.json","/zh/stages/ISW-SP_无序盛宴","/zh/stages/ISW-SP_无序盛宴/__data.json","/en/stages/ISW-SP_Disorderly_Banquet","/en/stages/ISW-SP_Disorderly_Banquet/__data.json","/ja/stages/ISW-SP_秩序無き盛宴","/ja/stages/ISW-SP_秩序無き盛宴/__data.json","/zh/stages/ISW-SP_自缚","/zh/stages/ISW-SP_自缚/__data.json","/en/stages/ISW-SP_Bound_by_Self","/en/stages/ISW-SP_Bound_by_Self/__data.json","/ja/stages/ISW-SP_自縛","/ja/stages/ISW-SP_自縛/__data.json","/zh/stages/ISW-SP_观察","/zh/stages/ISW-SP_观察/__data.json","/en/stages/ISW-SP_Observation","/en/stages/ISW-SP_Observation/__data.json","/ja/stages/ISW-SP_観察","/ja/stages/ISW-SP_観察/__data.json","/zh/stages/ISW-NO_与虫为伴","/zh/stages/ISW-NO_与虫为伴/__data.json","/en/stages/ISW-NO_A_Date_With_Slugs","/en/stages/ISW-NO_A_Date_With_Slugs/__data.json","/ja/stages/ISW-NO_ムシと一緒","/ja/stages/ISW-NO_ムシと一緒/__data.json","/zh/stages/ISW-NO_驯兽小屋","/zh/stages/ISW-NO_驯兽小屋/__data.json","/en/stages/ISW-NO_Beast_Taming","/en/stages/ISW-NO_Beast_Taming/__data.json","/ja/stages/ISW-NO_猛獣小屋","/ja/stages/ISW-NO_猛獣小屋/__data.json","/zh/stages/ISW-NO_礼炮小队","/zh/stages/ISW-NO_礼炮小队/__data.json","/en/stages/ISW-NO_Gun_Salute","/en/stages/ISW-NO_Gun_Salute/__data.json","/ja/stages/ISW-NO_礼砲小隊","/ja/stages/ISW-NO_礼砲小隊/__data.json","/zh/stages/ISW-NO_意外","/zh/stages/ISW-NO_意外/__data.json","/en/stages/ISW-NO_Accident","/en/stages/ISW-NO_Accident/__data.json","/ja/stages/ISW-NO_墜落事故","/ja/stages/ISW-NO_墜落事故/__data.json","/zh/stages/ISW-NO_死斗","/zh/stages/ISW-NO_死斗/__data.json","/en/stages/ISW-NO_Fight_to_the_Death","/en/stages/ISW-NO_Fight_to_the_Death/__data.json","/ja/stages/ISW-NO_死闘","/ja/stages/ISW-NO_死闘/__data.json","/zh/stages/ISW-NO_压轴登场","/zh/stages/ISW-NO_压轴登场/__data.json","/en/stages/ISW-NO_The_Grand_Finale","/en/stages/ISW-NO_The_Grand_Finale/__data.json","/ja/stages/ISW-NO_真打ち登場","/ja/stages/ISW-NO_真打ち登場/__data.json","/zh/stages/ISW-NO_巡逻队","/zh/stages/ISW-NO_巡逻队/__data.json","/en/stages/ISW-NO_Patrol_Squad","/en/stages/ISW-NO_Patrol_Squad/__data.json","/ja/stages/ISW-NO_巡視隊","/ja/stages/ISW-NO_巡視隊/__data.json","/zh/stages/ISW-NO_落魄骑士","/zh/stages/ISW-NO_落魄骑士/__data.json","/en/stages/ISW-NO_Destitute_Knights","/en/stages/ISW-NO_Destitute_Knights/__data.json","/ja/stages/ISW-NO_零落の騎士","/ja/stages/ISW-NO_零落の騎士/__data.json","/zh/stages/ISW-NO_分赃不均","/zh/stages/ISW-NO_分赃不均/__data.json","/en/stages/ISW-NO_Unequal_Split","/en/stages/ISW-NO_Unequal_Split/__data.json","/ja/stages/ISW-NO_分け前のもつれ","/ja/stages/ISW-NO_分け前のもつれ/__data.json","/zh/stages/ISW-NO_先来后到","/zh/stages/ISW-NO_先来后到/__data.json","/en/stages/ISW-NO_First_Come,_Last_Served","/en/stages/ISW-NO_First_Come,_Last_Served/__data.json","/ja/stages/ISW-NO_早い者勝ち","/ja/stages/ISW-NO_早い者勝ち/__data.json","/zh/stages/ISW-NO_正义","/zh/stages/ISW-NO_正义/__data.json","/en/stages/ISW-NO_Justice","/en/stages/ISW-NO_Justice/__data.json","/ja/stages/ISW-NO_正義","/ja/stages/ISW-NO_正義/__data.json","/zh/stages/ISW-NO_似曾相识","/zh/stages/ISW-NO_似曾相识/__data.json","/en/stages/ISW-NO_A_Familiar_Face","/en/stages/ISW-NO_A_Familiar_Face/__data.json","/ja/stages/ISW-NO_デジャヴュ","/ja/stages/ISW-NO_デジャヴュ/__data.json","/zh/stages/ISW-NO_酒商运输队","/zh/stages/ISW-NO_酒商运输队/__data.json","/en/stages/ISW-NO_Vintage_Transport","/en/stages/ISW-NO_Vintage_Transport/__data.json","/ja/stages/ISW-NO_酒屋の輸送隊","/ja/stages/ISW-NO_酒屋の輸送隊/__data.json","/zh/stages/ISW-NO_从众效应","/zh/stages/ISW-NO_从众效应/__data.json","/en/stages/ISW-NO_With_The_Crowd","/en/stages/ISW-NO_With_The_Crowd/__data.json","/ja/stages/ISW-NO_パブリック・エネミー","/ja/stages/ISW-NO_パブリック・エネミー/__data.json","/zh/stages/ISW-NO_斗兽笼","/zh/stages/ISW-NO_斗兽笼/__data.json","/en/stages/ISW-NO_Beast_Fighting","/en/stages/ISW-NO_Beast_Fighting/__data.json","/ja/stages/ISW-NO_闘獣の檻","/ja/stages/ISW-NO_闘獣の檻/__data.json","/zh/stages/ISW-NO_首演","/zh/stages/ISW-NO_首演/__data.json","/en/stages/ISW-NO_Premiere","/en/stages/ISW-NO_Premiere/__data.json","/ja/stages/ISW-NO_初演","/ja/stages/ISW-NO_初演/__data.json","/ja/stages/ISW-NO_感化","/ja/stages/ISW-NO_感化/__data.json","/en/stages/ISW-NO_Reform","/en/stages/ISW-NO_Reform/__data.json","/zh/stages/ISW-NO_雕匠与石像","/zh/stages/ISW-NO_雕匠与石像/__data.json","/en/stages/ISW-NO_Sculptor_and_Statue","/en/stages/ISW-NO_Sculptor_and_Statue/__data.json","/ja/stages/ISW-NO_彫刻師と石像","/ja/stages/ISW-NO_彫刻師と石像/__data.json","/zh/stages/ISW-NO_步步紧逼","/zh/stages/ISW-NO_步步紧逼/__data.json","/en/stages/ISW-NO_Pressing_Ahead","/en/stages/ISW-NO_Pressing_Ahead/__data.json","/ja/stages/ISW-NO_過去からの刺客","/ja/stages/ISW-NO_過去からの刺客/__data.json","/zh/stages/ISW-NO_阴云笼罩","/zh/stages/ISW-NO_阴云笼罩/__data.json","/en/stages/ISW-NO_Shrouded_in_Clouds","/en/stages/ISW-NO_Shrouded_in_Clouds/__data.json","/ja/stages/ISW-NO_覆う黒雲","/ja/stages/ISW-NO_覆う黒雲/__data.json","/zh/stages/ISW-NO_烟花秀","/zh/stages/ISW-NO_烟花秀/__data.json","/en/stages/ISW-NO_Fireworks_Show","/en/stages/ISW-NO_Fireworks_Show/__data.json","/ja/stages/ISW-NO_花火ショー","/ja/stages/ISW-NO_花火ショー/__data.json","/zh/stages/ISW-NO_永无尽头","/zh/stages/ISW-NO_永无尽头/__data.json","/en/stages/ISW-NO_Unending","/en/stages/ISW-NO_Unending/__data.json","/ja/stages/ISW-NO_エンドレスチャージ","/ja/stages/ISW-NO_エンドレスチャージ/__data.json","/zh/stages/ISW-NO_远方来客","/zh/stages/ISW-NO_远方来客/__data.json","/en/stages/ISW-NO_Traveler_From_Afar","/en/stages/ISW-NO_Traveler_From_Afar/__data.json","/ja/stages/ISW-NO_遠方からの来客","/ja/stages/ISW-NO_遠方からの来客/__data.json","/zh/stages/ISW-NO_共舞","/zh/stages/ISW-NO_共舞/__data.json","/en/stages/ISW-NO_A_Dance_Together","/en/stages/ISW-NO_A_Dance_Together/__data.json","/ja/stages/ISW-NO_ナイトフィーバー","/ja/stages/ISW-NO_ナイトフィーバー/__data.json","/zh/stages/ISW-NO_鲍勃酒品","/zh/stages/ISW-NO_鲍勃酒品/__data.json","/en/stages/ISW-NO_Bob's_Beers","/en/stages/ISW-NO_Bob's_Beers/__data.json","/ja/stages/ISW-NO_ボブ酒造","/ja/stages/ISW-NO_ボブ酒造/__data.json","/zh/stages/ISW-NO_雪山上的来客","/zh/stages/ISW-NO_雪山上的来客/__data.json","/en/stages/ISW-NO_Alpine_Visitor","/en/stages/ISW-NO_Alpine_Visitor/__data.json","/ja/stages/ISW-NO_雪山の来客","/ja/stages/ISW-NO_雪山の来客/__data.json","/zh/stages/ISW-NO_无人机起降库","/zh/stages/ISW-NO_无人机起降库/__data.json","/en/stages/ISW-NO_Drone_Landing_Zone","/en/stages/ISW-NO_Drone_Landing_Zone/__data.json","/ja/stages/ISW-NO_ドローン発着庫","/ja/stages/ISW-NO_ドローン発着庫/__data.json","/zh/stages/ISW-NO_红雾弥漫","/zh/stages/ISW-NO_红雾弥漫/__data.json","/en/stages/ISW-NO_The_Red_Mist","/en/stages/ISW-NO_The_Red_Mist/__data.json","/ja/stages/ISW-NO_赤い霧の眠らぬ夜","/ja/stages/ISW-NO_赤い霧の眠らぬ夜/__data.json","/zh/stages/ISW-NO_仪式之夜","/zh/stages/ISW-NO_仪式之夜/__data.json","/en/stages/ISW-NO_The_Night_of_Ritual","/en/stages/ISW-NO_The_Night_of_Ritual/__data.json","/ja/stages/ISW-NO_儀式の夜","/ja/stages/ISW-NO_儀式の夜/__data.json","/zh/stages/ISW-NO_彻骨冰寒","/zh/stages/ISW-NO_彻骨冰寒/__data.json","/en/stages/ISW-NO_The_Biting_Cold","/en/stages/ISW-NO_The_Biting_Cold/__data.json","/ja/stages/ISW-NO_氷の芸術","/ja/stages/ISW-NO_氷の芸術/__data.json","/zh/stages/ISW-NO_危机四伏","/zh/stages/ISW-NO_危机四伏/__data.json","/en/stages/ISW-NO_Dangers_Abound","/en/stages/ISW-NO_Dangers_Abound/__data.json","/ja/stages/ISW-NO_ポルターガイスト","/ja/stages/ISW-NO_ポルターガイスト/__data.json","/zh/stages/ISW-NO_惊喜工厂","/zh/stages/ISW-NO_惊喜工厂/__data.json","/en/stages/ISW-NO_Surprise_Factory","/en/stages/ISW-NO_Surprise_Factory/__data.json","/ja/stages/ISW-NO_サプライズ工場","/ja/stages/ISW-NO_サプライズ工場/__data.json","/zh/stages/ISW-NO_荒唐把戏","/zh/stages/ISW-NO_荒唐把戏/__data.json","/en/stages/ISW-NO_Absurd_Trickeries","/en/stages/ISW-NO_Absurd_Trickeries/__data.json","/ja/stages/ISW-NO_奈落への吶喊","/ja/stages/ISW-NO_奈落への吶喊/__data.json","/zh/stages/ISW-NO_隔岸观火","/zh/stages/ISW-NO_隔岸观火/__data.json","/en/stages/ISW-NO_From_Afar","/en/stages/ISW-NO_From_Afar/__data.json","/ja/stages/ISW-NO_対岸の火事","/ja/stages/ISW-NO_対岸の火事/__data.json","/zh/stages/ISW-NO_萨卡兹的渴求","/zh/stages/ISW-NO_萨卡兹的渴求/__data.json","/en/stages/ISW-NO_Sarkaz_Desire","/en/stages/ISW-NO_Sarkaz_Desire/__data.json","/ja/stages/ISW-NO_サルカズの渇望","/ja/stages/ISW-NO_サルカズの渇望/__data.json","/zh/stages/ISW-NO_乌萨斯的渴求","/zh/stages/ISW-NO_乌萨斯的渴求/__data.json","/en/stages/ISW-NO_Ursus_Desire","/en/stages/ISW-NO_Ursus_Desire/__data.json","/ja/stages/ISW-NO_ウルサスの渇望","/ja/stages/ISW-NO_ウルサスの渇望/__data.json","/zh/stages/ISW-NO_永恒安息","/zh/stages/ISW-NO_永恒安息/__data.json","/en/stages/ISW-NO_Requiem_Aeternam","/en/stages/ISW-NO_Requiem_Aeternam/__data.json","/ja/stages/ISW-NO_永遠の安らぎ","/ja/stages/ISW-NO_永遠の安らぎ/__data.json","/zh/stages/ISW-NO_永恒愤怒","/zh/stages/ISW-NO_永恒愤怒/__data.json","/en/stages/ISW-NO_Eternal_Wrath","/en/stages/ISW-NO_Eternal_Wrath/__data.json","/ja/stages/ISW-NO_永遠の怒り","/ja/stages/ISW-NO_永遠の怒り/__data.json","/zh/stages/ISW-NO_分离与统一","/zh/stages/ISW-NO_分离与统一/__data.json","/en/stages/ISW-NO_Separation_and_Unity","/en/stages/ISW-NO_Separation_and_Unity/__data.json","/ja/stages/ISW-NO_分離と統一","/ja/stages/ISW-NO_分離と統一/__data.json","/zh/stages/ISW-NO_异体同心","/zh/stages/ISW-NO_异体同心/__data.json","/en/stages/ISW-NO_Two_Forms,_One_Heart","/en/stages/ISW-NO_Two_Forms,_One_Heart/__data.json","/ja/stages/ISW-NO_異体同心","/ja/stages/ISW-NO_異体同心/__data.json","/zh/stages/ISW-NO_纠错","/zh/stages/ISW-NO_纠错/__data.json","/en/stages/ISW-NO_Course_Correction","/en/stages/ISW-NO_Course_Correction/__data.json","/ja/stages/ISW-NO_修正","/ja/stages/ISW-NO_修正/__data.json","/zh/stages/ISW-NO_订正","/zh/stages/ISW-NO_订正/__data.json","/en/stages/ISW-NO_Route_Revision","/en/stages/ISW-NO_Route_Revision/__data.json","/ja/stages/ISW-NO_訂正","/ja/stages/ISW-NO_訂正/__data.json","/zh/stages/ISW-DF_认知即重担","/zh/stages/ISW-DF_认知即重担/__data.json","/en/stages/ISW-DF_Curse_of_Cognition","/en/stages/ISW-DF_Curse_of_Cognition/__data.json","/ja/stages/ISW-DF_認知とは負担なり","/ja/stages/ISW-DF_認知とは負担なり/__data.json","/zh/stages/ISW-DF_“命运的宠儿”","/zh/stages/ISW-DF_“命运的宠儿”/__data.json","/en/stages/ISW-DF_'Fate's_Favored_Child'","/en/stages/ISW-DF_'Fate's_Favored_Child'/__data.json","/ja/stages/ISW-DF_「運命の寵児」","/ja/stages/ISW-DF_「運命の寵児」/__data.json","/zh/stages/ISW-DF_大群所向","/zh/stages/ISW-DF_大群所向/__data.json","/en/stages/ISW-DF_Destiny_of_We_Many","/en/stages/ISW-DF_Destiny_of_We_Many/__data.json","/ja/stages/ISW-DF_大群の向かう先","/ja/stages/ISW-DF_大群の向かう先/__data.json","/zh/stages/ISW-DF_人之光辉","/zh/stages/ISW-DF_人之光辉/__data.json","/en/stages/ISW-DF_Glory_of_Humanity","/en/stages/ISW-DF_Glory_of_Humanity/__data.json","/ja/stages/ISW-DF_人たる存在の輝き","/ja/stages/ISW-DF_人たる存在の輝き/__data.json","/zh/stages/ISW-DF_荒地群猎","/zh/stages/ISW-DF_荒地群猎/__data.json","/en/stages/ISW-DF_Hunting_Group","/en/stages/ISW-DF_Hunting_Group/__data.json","/ja/stages/ISW-DF_荒野の猟師","/ja/stages/ISW-DF_荒野の猟師/__data.json","/zh/stages/ISW-DF_寒灾之咒","/zh/stages/ISW-DF_寒灾之咒/__data.json","/en/stages/ISW-DF_Chilling_Curse","/en/stages/ISW-DF_Chilling_Curse/__data.json","/ja/stages/ISW-DF_寒災の呪い","/ja/stages/ISW-DF_寒災の呪い/__data.json","/zh/stages/ISW-DF_险路勿近","/zh/stages/ISW-DF_险路勿近/__data.json","/en/stages/ISW-DF_Avoid_Unsafe_Roads","/en/stages/ISW-DF_Avoid_Unsafe_Roads/__data.json","/ja/stages/ISW-DF_危うきに近寄るべからず","/ja/stages/ISW-DF_危うきに近寄るべからず/__data.json","/zh/stages/ISW-DU_犹豫不决","/zh/stages/ISW-DU_犹豫不决/__data.json","/en/stages/ISW-DU_Indecisiveness","/en/stages/ISW-DU_Indecisiveness/__data.json","/ja/stages/ISW-DU_優柔不断","/ja/stages/ISW-DU_優柔不断/__data.json","/zh/stages/ISW-DU_监工现场","/zh/stages/ISW-DU_监工现场/__data.json","/en/stages/ISW-DU_Supervision_Site","/en/stages/ISW-DU_Supervision_Site/__data.json","/ja/stages/ISW-DU_現場監督","/ja/stages/ISW-DU_現場監督/__data.json","/zh/stages/ISW-DU_拳拳到肉","/zh/stages/ISW-DU_拳拳到肉/__data.json","/en/stages/ISW-DU_Right_in_the_Kisser","/en/stages/ISW-DU_Right_in_the_Kisser/__data.json","/ja/stages/ISW-DU_ヘビーブロウ","/ja/stages/ISW-DU_ヘビーブロウ/__data.json","/zh/stages/ISW-DU_抱头狗窜","/zh/stages/ISW-DU_抱头狗窜/__data.json","/en/stages/ISW-DU_Tail_Between_Legs","/en/stages/ISW-DU_Tail_Between_Legs/__data.json","/ja/stages/ISW-DU_逃げ惑う弱者","/ja/stages/ISW-DU_逃げ惑う弱者/__data.json","/zh/stages/ISW-DU_鸭本运作","/zh/stages/ISW-DU_鸭本运作/__data.json","/en/stages/ISW-DU_A_New_Day,_A_New_Duck","/en/stages/ISW-DU_A_New_Day,_A_New_Duck/__data.json","/ja/stages/ISW-DU_ダックキャピタル","/ja/stages/ISW-DU_ダックキャピタル/__data.json","/ja/stages/ISW-SP_真相","/ja/stages/ISW-SP_真相/__data.json","/en/stages/ISW-SP_Reality","/en/stages/ISW-SP_Reality/__data.json","/zh/stages/ISW-SP_狂信如火","/zh/stages/ISW-SP_狂信如火/__data.json","/en/stages/ISW-SP_Fanatical_Flames","/en/stages/ISW-SP_Fanatical_Flames/__data.json","/ja/stages/ISW-SP_火の如き狂信","/ja/stages/ISW-SP_火の如き狂信/__data.json","/zh/stages/ISW-SP_“喜”从箱来","/zh/stages/ISW-SP_“喜”从箱来/__data.json","/en/stages/ISW-SP_'Joy'_From_a_Box","/en/stages/ISW-SP_'Joy'_From_a_Box/__data.json","/ja/stages/ISW-SP_「喜び」は箱より来たる","/ja/stages/ISW-SP_「喜び」は箱より来たる/__data.json","/zh/stages/ISW-SP_竭泽而渔","/zh/stages/ISW-SP_竭泽而渔/__data.json","/en/stages/ISW-SP_Fishing_in_a_Dry_Pond","/en/stages/ISW-SP_Fishing_in_a_Dry_Pond/__data.json","/ja/stages/ISW-SP_水を抜き魚を取る","/ja/stages/ISW-SP_水を抜き魚を取る/__data.json","/zh/stages/ISW-SP_图穷匕见","/zh/stages/ISW-SP_图穷匕见/__data.json","/en/stages/ISW-SP_See_the_Big_Picture","/en/stages/ISW-SP_See_the_Big_Picture/__data.json","/ja/stages/ISW-SP_露になる切っ先","/ja/stages/ISW-SP_露になる切っ先/__data.json","/zh/stages/ISW-NO_蓄水池","/zh/stages/ISW-NO_蓄水池/__data.json","/en/stages/ISW-NO_Cistern","/en/stages/ISW-NO_Cistern/__data.json","/ja/stages/ISW-NO_貯水池","/ja/stages/ISW-NO_貯水池/__data.json","/zh/stages/ISW-NO_虫群横行","/zh/stages/ISW-NO_虫群横行/__data.json","/en/stages/ISW-NO_Insect_Infestation","/en/stages/ISW-NO_Insect_Infestation/__data.json","/ja/stages/ISW-NO_横切る虫の群れ","/ja/stages/ISW-NO_横切る虫の群れ/__data.json","/zh/stages/ISW-NO_射手部队","/zh/stages/ISW-NO_射手部队/__data.json","/en/stages/ISW-NO_Sniper_Squad","/en/stages/ISW-NO_Sniper_Squad/__data.json","/ja/stages/ISW-NO_射手部隊","/ja/stages/ISW-NO_射手部隊/__data.json","/ja/stages/ISW-NO_共生","/ja/stages/ISW-NO_共生/__data.json","/en/stages/ISW-NO_Symbiosis","/en/stages/ISW-NO_Symbiosis/__data.json","/zh/stages/ISW-NO_互助","/zh/stages/ISW-NO_互助/__data.json","/en/stages/ISW-NO_Mutual_Aid","/en/stages/ISW-NO_Mutual_Aid/__data.json","/ja/stages/ISW-NO_助け合い","/ja/stages/ISW-NO_助け合い/__data.json","/zh/stages/ISW-NO_无声呼号","/zh/stages/ISW-NO_无声呼号/__data.json","/en/stages/ISW-NO_Voiceless_Summons","/en/stages/ISW-NO_Voiceless_Summons/__data.json","/ja/stages/ISW-NO_声なき叫び","/ja/stages/ISW-NO_声なき叫び/__data.json","/zh/stages/ISW-NO_海神的信者","/zh/stages/ISW-NO_海神的信者/__data.json","/en/stages/ISW-NO_Leviathan's_Followers","/en/stages/ISW-NO_Leviathan's_Followers/__data.json","/ja/stages/ISW-NO_海神の信者","/ja/stages/ISW-NO_海神の信者/__data.json","/zh/stages/ISW-NO_病症","/zh/stages/ISW-NO_病症/__data.json","/en/stages/ISW-NO_Malady","/en/stages/ISW-NO_Malady/__data.json","/ja/stages/ISW-NO_疾病","/ja/stages/ISW-NO_疾病/__data.json","/zh/stages/ISW-NO_征兆","/zh/stages/ISW-NO_征兆/__data.json","/en/stages/ISW-NO_Omen","/en/stages/ISW-NO_Omen/__data.json","/ja/stages/ISW-NO_兆候","/ja/stages/ISW-NO_兆候/__data.json","/zh/stages/ISW-NO_回溯","/zh/stages/ISW-NO_回溯/__data.json","/en/stages/ISW-NO_Ebb","/en/stages/ISW-NO_Ebb/__data.json","/ja/stages/ISW-NO_回想","/ja/stages/ISW-NO_回想/__data.json","/zh/stages/ISW-NO_饥渴","/zh/stages/ISW-NO_饥渴/__data.json","/en/stages/ISW-NO_Hunger_and_Thirst","/en/stages/ISW-NO_Hunger_and_Thirst/__data.json","/ja/stages/ISW-NO_飢えと渇き","/ja/stages/ISW-NO_飢えと渇き/__data.json","/zh/stages/ISW-NO_除暴安良","/zh/stages/ISW-NO_除暴安良/__data.json","/en/stages/ISW-NO_Crime_and_Punishment","/en/stages/ISW-NO_Crime_and_Punishment/__data.json","/ja/stages/ISW-NO_平和の奪還","/ja/stages/ISW-NO_平和の奪還/__data.json","/zh/stages/ISW-NO_原始部落","/zh/stages/ISW-NO_原始部落/__data.json","/en/stages/ISW-NO_Troglodyte_Tribe","/en/stages/ISW-NO_Troglodyte_Tribe/__data.json","/ja/stages/ISW-NO_原始集落","/ja/stages/ISW-NO_原始集落/__data.json","/zh/stages/ISW-NO_精酿杀手","/zh/stages/ISW-NO_精酿杀手/__data.json","/en/stages/ISW-NO_Craft_Brewer_Killer","/en/stages/ISW-NO_Craft_Brewer_Killer/__data.json","/ja/stages/ISW-NO_クラフトキラー","/ja/stages/ISW-NO_クラフトキラー/__data.json","/zh/stages/ISW-NO_大君遗脉","/zh/stages/ISW-NO_大君遗脉/__data.json","/en/stages/ISW-NO_Sanguinarch's_Legacy","/en/stages/ISW-NO_Sanguinarch's_Legacy/__data.json","/ja/stages/ISW-NO_大君の末裔","/ja/stages/ISW-NO_大君の末裔/__data.json","/zh/stages/ISW-NO_据险固守","/zh/stages/ISW-NO_据险固守/__data.json","/en/stages/ISW-NO_Precarious_Defense","/en/stages/ISW-NO_Precarious_Defense/__data.json","/ja/stages/ISW-NO_要害の守護","/ja/stages/ISW-NO_要害の守護/__data.json","/zh/stages/ISW-NO_巢穴","/zh/stages/ISW-NO_巢穴/__data.json","/en/stages/ISW-NO_The_Nest","/en/stages/ISW-NO_The_Nest/__data.json","/ja/stages/ISW-NO_巣窟","/ja/stages/ISW-NO_巣窟/__data.json","/zh/stages/ISW-NO_漩涡","/zh/stages/ISW-NO_漩涡/__data.json","/en/stages/ISW-NO_Vortex","/en/stages/ISW-NO_Vortex/__data.json","/ja/stages/ISW-NO_渦","/ja/stages/ISW-NO_渦/__data.json","/zh/stages/ISW-NO_瞻前顾后","/zh/stages/ISW-NO_瞻前顾后/__data.json","/en/stages/ISW-NO_Looking_Forward,_Looking_Back","/en/stages/ISW-NO_Looking_Forward,_Looking_Back/__data.json","/ja/stages/ISW-NO_優柔不断","/ja/stages/ISW-NO_優柔不断/__data.json","/zh/stages/ISW-NO_地下天途","/zh/stages/ISW-NO_地下天途/__data.json","/en/stages/ISW-NO_Underground_Ascension","/en/stages/ISW-NO_Underground_Ascension/__data.json","/ja/stages/ISW-NO_地下の天路","/ja/stages/ISW-NO_地下の天路/__data.json","/zh/stages/ISW-NO_火之骄子","/zh/stages/ISW-NO_火之骄子/__data.json","/en/stages/ISW-NO_Blaze_of_Glory","/en/stages/ISW-NO_Blaze_of_Glory/__data.json","/ja/stages/ISW-NO_火の寵児","/ja/stages/ISW-NO_火の寵児/__data.json","/zh/stages/ISW-NO_领地意识","/zh/stages/ISW-NO_领地意识/__data.json","/en/stages/ISW-NO_Territorial_Tendencies","/en/stages/ISW-NO_Territorial_Tendencies/__data.json","/ja/stages/ISW-NO_縄張り意識","/ja/stages/ISW-NO_縄張り意識/__data.json","/zh/stages/ISW-NO_海窟沙暴","/zh/stages/ISW-NO_海窟沙暴/__data.json","/en/stages/ISW-NO_Seacavern_Sandstorm","/en/stages/ISW-NO_Seacavern_Sandstorm/__data.json","/ja/stages/ISW-NO_海窟の砂嵐","/ja/stages/ISW-NO_海窟の砂嵐/__data.json","/zh/stages/ISW-NO_溟痕乐园","/zh/stages/ISW-NO_溟痕乐园/__data.json","/en/stages/ISW-NO_Nethersea_Brand_Land","/en/stages/ISW-NO_Nethersea_Brand_Land/__data.json","/ja/stages/ISW-NO_溟痕の楽園","/ja/stages/ISW-NO_溟痕の楽園/__data.json","/zh/stages/ISW-NO_狩猎场","/zh/stages/ISW-NO_狩猎场/__data.json","/en/stages/ISW-NO_Hunting_Grounds","/en/stages/ISW-NO_Hunting_Grounds/__data.json","/ja/stages/ISW-NO_狩猟場","/ja/stages/ISW-NO_狩猟場/__data.json","/zh/stages/ISW-NO_崇敬深海","/zh/stages/ISW-NO_崇敬深海/__data.json","/en/stages/ISW-NO_The_Revered_Abyss","/en/stages/ISW-NO_The_Revered_Abyss/__data.json","/ja/stages/ISW-NO_深海を崇めよ","/ja/stages/ISW-NO_深海を崇めよ/__data.json","/zh/stages/ISW-NO_铳与秩序","/zh/stages/ISW-NO_铳与秩序/__data.json","/en/stages/ISW-NO_Guns_and_Order","/en/stages/ISW-NO_Guns_and_Order/__data.json","/ja/stages/ISW-NO_銃と秩序","/ja/stages/ISW-NO_銃と秩序/__data.json","/zh/stages/ISW-NO_机械之灾","/zh/stages/ISW-NO_机械之灾/__data.json","/en/stages/ISW-NO_Mechanical_Menace","/en/stages/ISW-NO_Mechanical_Menace/__data.json","/ja/stages/ISW-NO_機械の災い","/ja/stages/ISW-NO_機械の災い/__data.json","/zh/stages/ISW-NO_教徒居所","/zh/stages/ISW-NO_教徒居所/__data.json","/en/stages/ISW-NO_The_Faithful's_Utopia","/en/stages/ISW-NO_The_Faithful's_Utopia/__data.json","/ja/stages/ISW-NO_教徒の住処","/ja/stages/ISW-NO_教徒の住処/__data.json","/zh/stages/ISW-NO_失控","/zh/stages/ISW-NO_失控/__data.json","/en/stages/ISW-NO_Out_of_Control","/en/stages/ISW-NO_Out_of_Control/__data.json","/ja/stages/ISW-NO_制御不能","/ja/stages/ISW-NO_制御不能/__data.json","/zh/stages/ISW-NO_吹笛人的号召","/zh/stages/ISW-NO_吹笛人的号召/__data.json","/en/stages/ISW-NO_The_Piper's_Call","/en/stages/ISW-NO_The_Piper's_Call/__data.json","/ja/stages/ISW-NO_笛吹きの号令","/ja/stages/ISW-NO_笛吹きの号令/__data.json","/zh/stages/ISW-NO_好梦在何方","/zh/stages/ISW-NO_好梦在何方/__data.json","/en/stages/ISW-NO_Ubi_bona_somnia","/en/stages/ISW-NO_Ubi_bona_somnia/__data.json","/ja/stages/ISW-NO_良き夢は何処に","/ja/stages/ISW-NO_良き夢は何処に/__data.json","/ja/stages/ISW-NO_育生池","/ja/stages/ISW-NO_育生池/__data.json","/en/stages/ISW-NO_Pool_of_Procreation","/en/stages/ISW-NO_Pool_of_Procreation/__data.json","/ja/stages/ISW-NO_蔓延","/ja/stages/ISW-NO_蔓延/__data.json","/en/stages/ISW-NO_The_Spread","/en/stages/ISW-NO_The_Spread/__data.json","/zh/stages/ISW-NO_余烬方阵","/zh/stages/ISW-NO_余烬方阵/__data.json","/en/stages/ISW-NO_Ember_Phalanx","/en/stages/ISW-NO_Ember_Phalanx/__data.json","/ja/stages/ISW-NO_残火の行進","/ja/stages/ISW-NO_残火の行進/__data.json","/zh/stages/ISW-NO_水火相容","/zh/stages/ISW-NO_水火相容/__data.json","/en/stages/ISW-NO_Water_and_Fire_Union","/en/stages/ISW-NO_Water_and_Fire_Union/__data.json","/ja/stages/ISW-NO_相容れる水と火","/ja/stages/ISW-NO_相容れる水と火/__data.json","/zh/stages/ISW-NO_深度认知","/zh/stages/ISW-NO_深度认知/__data.json","/en/stages/ISW-NO_Deep_Cognition","/en/stages/ISW-NO_Deep_Cognition/__data.json","/ja/stages/ISW-NO_深度認知","/ja/stages/ISW-NO_深度認知/__data.json","/zh/stages/ISW-NO_利刃所指","/zh/stages/ISW-NO_利刃所指/__data.json","/en/stages/ISW-NO_Blade_Signifier","/en/stages/ISW-NO_Blade_Signifier/__data.json","/ja/stages/ISW-NO_利刃の示す先","/ja/stages/ISW-NO_利刃の示す先/__data.json","/ja/stages/ISW-NO_呼吸","/ja/stages/ISW-NO_呼吸/__data.json","/en/stages/ISW-NO_Breathing","/en/stages/ISW-NO_Breathing/__data.json","/zh/stages/ISW-NO_新部族","/zh/stages/ISW-NO_新部族/__data.json","/en/stages/ISW-NO_New_Tribe","/en/stages/ISW-NO_New_Tribe/__data.json","/ja/stages/ISW-NO_新たな部族","/ja/stages/ISW-NO_新たな部族/__data.json","/zh/stages/ISW-NO_夺树者","/zh/stages/ISW-NO_夺树者/__data.json","/en/stages/ISW-NO_Tree-Snatcher","/en/stages/ISW-NO_Tree-Snatcher/__data.json","/ja/stages/ISW-NO_族樹の破壊者","/ja/stages/ISW-NO_族樹の破壊者/__data.json","/zh/stages/ISW-NO_自然之怒","/zh/stages/ISW-NO_自然之怒/__data.json","/en/stages/ISW-NO_Nature's_Wrath","/en/stages/ISW-NO_Nature's_Wrath/__data.json","/ja/stages/ISW-NO_大自然の怒り","/ja/stages/ISW-NO_大自然の怒り/__data.json","/zh/stages/ISW-NO_大地醒转","/zh/stages/ISW-NO_大地醒转/__data.json","/en/stages/ISW-NO_The_Earth_Wakes","/en/stages/ISW-NO_The_Earth_Wakes/__data.json","/ja/stages/ISW-NO_大地の目覚め","/ja/stages/ISW-NO_大地の目覚め/__data.json","/zh/stages/ISW-DF_巍峨银凇","/zh/stages/ISW-DF_巍峨银凇/__data.json","/en/stages/ISW-DF_Lofty_Silverfrost","/en/stages/ISW-DF_Lofty_Silverfrost/__data.json","/ja/stages/ISW-DF_そびえ立つ銀霜","/ja/stages/ISW-DF_そびえ立つ銀霜/__data.json","/zh/stages/ISW-DF_深寒造像","/zh/stages/ISW-DF_深寒造像/__data.json","/en/stages/ISW-DF_Ice-Cold_Image","/en/stages/ISW-DF_Ice-Cold_Image/__data.json","/ja/stages/ISW-DF_極寒が造りしもの","/ja/stages/ISW-DF_極寒が造りしもの/__data.json","/zh/stages/ISW-DF_萨米之熵","/zh/stages/ISW-DF_萨米之熵/__data.json","/en/stages/ISW-DF_Sami's_Entropy","/en/stages/ISW-DF_Sami's_Entropy/__data.json","/ja/stages/ISW-DF_サーミのエントロピー","/ja/stages/ISW-DF_サーミのエントロピー/__data.json","/zh/stages/ISW-DF_虚无之偶","/zh/stages/ISW-DF_虚无之偶/__data.json","/en/stages/ISW-DF_Hollow_Visage","/en/stages/ISW-DF_Hollow_Visage/__data.json","/ja/stages/ISW-DF_虚無の偶像","/ja/stages/ISW-DF_虚無の偶像/__data.json","/zh/stages/ISW-DF_园丁","/zh/stages/ISW-DF_园丁/__data.json","/en/stages/ISW-DF_Gardener","/en/stages/ISW-DF_Gardener/__data.json","/ja/stages/ISW-DF_庭師","/ja/stages/ISW-DF_庭師/__data.json","/zh/stages/ISW-DF_哨兵","/zh/stages/ISW-DF_哨兵/__data.json","/en/stages/ISW-DF_Sentinel","/en/stages/ISW-DF_Sentinel/__data.json","/ja/stages/ISW-DF_歩哨","/ja/stages/ISW-DF_歩哨/__data.json","/zh/stages/ISW-DF_时光之沙","/zh/stages/ISW-DF_时光之沙/__data.json","/en/stages/ISW-DF_Sands_of_Time","/en/stages/ISW-DF_Sands_of_Time/__data.json","/ja/stages/ISW-DF_時の砂","/ja/stages/ISW-DF_時の砂/__data.json","/zh/stages/ISW-DF_迈入永恒","/zh/stages/ISW-DF_迈入永恒/__data.json","/en/stages/ISW-DF_Enter_Eternity","/en/stages/ISW-DF_Enter_Eternity/__data.json","/ja/stages/ISW-DF_永遠へと踏み入る","/ja/stages/ISW-DF_永遠へと踏み入る/__data.json","/zh/stages/ISW-DF_半吊子之旅","/zh/stages/ISW-DF_半吊子之旅/__data.json","/en/stages/ISW-DF_Half-baked_Trip","/en/stages/ISW-DF_Half-baked_Trip/__data.json","/ja/stages/ISW-DF_小心者の旅","/ja/stages/ISW-DF_小心者の旅/__data.json","/zh/stages/ISW-DF_无中生钱","/zh/stages/ISW-DF_无中生钱/__data.json","/en/stages/ISW-DF_Moneymaking_from_Nothing","/en/stages/ISW-DF_Moneymaking_from_Nothing/__data.json","/ja/stages/ISW-DF_無から富を生む","/ja/stages/ISW-DF_無から富を生む/__data.json","/zh/stages/ISW-DF_豪华车队","/zh/stages/ISW-DF_豪华车队/__data.json","/en/stages/ISW-DF_Luxurious_Fleet","/en/stages/ISW-DF_Luxurious_Fleet/__data.json","/ja/stages/ISW-DF_豪華な車列","/ja/stages/ISW-DF_豪華な車列/__data.json","/zh/stages/ISW-DF_“正义使者”","/zh/stages/ISW-DF_“正义使者”/__data.json","/en/stages/ISW-DF_'Envoy_of_Justice'","/en/stages/ISW-DF_'Envoy_of_Justice'/__data.json","/ja/stages/ISW-DF_「正義の使者」","/ja/stages/ISW-DF_「正義の使者」/__data.json","/zh/stages/ISW-SP_天途半道","/zh/stages/ISW-SP_天途半道/__data.json","/en/stages/ISW-SP_Halfway_on_Khaganquest","/en/stages/ISW-SP_Halfway_on_Khaganquest/__data.json","/ja/stages/ISW-SP_天路の半ば","/ja/stages/ISW-SP_天路の半ば/__data.json","/zh/stages/ISW-SP_夙愿将偿","/zh/stages/ISW-SP_夙愿将偿/__data.json","/en/stages/ISW-SP_Long-sought_Compensation","/en/stages/ISW-SP_Long-sought_Compensation/__data.json","/ja/stages/ISW-SP_宿願成就目前","/ja/stages/ISW-SP_宿願成就目前/__data.json","/zh/stages/ISW-SP_惩罚","/zh/stages/ISW-SP_惩罚/__data.json","/en/stages/ISW-SP_Penalty","/en/stages/ISW-SP_Penalty/__data.json","/ja/stages/ISW-SP_処罰","/ja/stages/ISW-SP_処罰/__data.json","/zh/stages/ISW-SP_英雄无名","/zh/stages/ISW-SP_英雄无名/__data.json","/en/stages/ISW-SP_Nameless_Hero","/en/stages/ISW-SP_Nameless_Hero/__data.json","/ja/stages/ISW-SP_名もなき英雄","/ja/stages/ISW-SP_名もなき英雄/__data.json","/zh/stages/ISW-SP_腹背受敌","/zh/stages/ISW-SP_腹背受敌/__data.json","/en/stages/ISW-SP_Rock_and_a_Hard_Place","/en/stages/ISW-SP_Rock_and_a_Hard_Place/__data.json","/ja/stages/ISW-SP_挟み撃ち","/ja/stages/ISW-SP_挟み撃ち/__data.json","/zh/stages/ISW-SP_长期试用","/zh/stages/ISW-SP_长期试用/__data.json","/en/stages/ISW-SP_Long-term_Trial","/en/stages/ISW-SP_Long-term_Trial/__data.json","/ja/stages/ISW-SP_長期試用","/ja/stages/ISW-SP_長期試用/__data.json","/zh/stages/ISW-SP_自然条款","/zh/stages/ISW-SP_自然条款/__data.json","/en/stages/ISW-SP_Nature's_Clause","/en/stages/ISW-SP_Nature's_Clause/__data.json","/ja/stages/ISW-SP_自然の掟","/ja/stages/ISW-SP_自然の掟/__data.json","/zh/stages/ISW-SP_黄沙幻境","/zh/stages/ISW-SP_黄沙幻境/__data.json","/en/stages/ISW-SP_Illusions_In_The_Sand","/en/stages/ISW-SP_Illusions_In_The_Sand/__data.json","/ja/stages/ISW-SP_黄砂の幻境","/ja/stages/ISW-SP_黄砂の幻境/__data.json","/zh/stages/ISW-SP_亘古仇敌","/zh/stages/ISW-SP_亘古仇敌/__data.json","/en/stages/ISW-SP_Ancient_Enemies","/en/stages/ISW-SP_Ancient_Enemies/__data.json","/ja/stages/ISW-SP_古よりの仇敵","/ja/stages/ISW-SP_古よりの仇敵/__data.json","/zh/stages/ISW-NO_死囚之夜","/zh/stages/ISW-NO_死囚之夜/__data.json","/en/stages/ISW-NO_Prisoners'_Night","/en/stages/ISW-NO_Prisoners'_Night/__data.json","/ja/stages/ISW-NO_死刑囚の夜","/ja/stages/ISW-NO_死刑囚の夜/__data.json","/zh/stages/ISW-NO_度假村冤魂","/zh/stages/ISW-NO_度假村冤魂/__data.json","/en/stages/ISW-NO_Ghosts_of_the_Resort","/en/stages/ISW-NO_Ghosts_of_the_Resort/__data.json","/ja/stages/ISW-NO_リゾートの怨霊","/ja/stages/ISW-NO_リゾートの怨霊/__data.json","/zh/stages/ISW-NO_苔手","/zh/stages/ISW-NO_苔手/__data.json","/en/stages/ISW-NO_Hands_of_Moss","/en/stages/ISW-NO_Hands_of_Moss/__data.json","/ja/stages/ISW-NO_苔の手形","/ja/stages/ISW-NO_苔の手形/__data.json","/zh/stages/ISW-NO_待宰的兽群","/zh/stages/ISW-NO_待宰的兽群/__data.json","/en/stages/ISW-NO_Beasts_Awaiting_Slaughter","/en/stages/ISW-NO_Beasts_Awaiting_Slaughter/__data.json","/ja/stages/ISW-NO_死を待つ獣の群れ","/ja/stages/ISW-NO_死を待つ獣の群れ/__data.json","/zh/stages/ISW-NO_事不过四","/zh/stages/ISW-NO_事不过四/__data.json","/en/stages/ISW-NO_No_More_Than_Four","/en/stages/ISW-NO_No_More_Than_Four/__data.json","/ja/stages/ISW-NO_四度目は無し","/ja/stages/ISW-NO_四度目は無し/__data.json","/zh/stages/ISW-NO_没有尽头的路","/zh/stages/ISW-NO_没有尽头的路/__data.json","/en/stages/ISW-NO_Path_with_No_End","/en/stages/ISW-NO_Path_with_No_End/__data.json","/ja/stages/ISW-NO_終点なき道","/ja/stages/ISW-NO_終点なき道/__data.json","/zh/stages/ISW-NO_低空机动","/zh/stages/ISW-NO_低空机动/__data.json","/en/stages/ISW-NO_Low-Altitude_Maneuvering","/en/stages/ISW-NO_Low-Altitude_Maneuvering/__data.json","/ja/stages/ISW-NO_低空機動","/ja/stages/ISW-NO_低空機動/__data.json","/zh/stages/ISW-NO_幽影与鬼魅","/zh/stages/ISW-NO_幽影与鬼魅/__data.json","/en/stages/ISW-NO_Shadows_With_Ghosts","/en/stages/ISW-NO_Shadows_With_Ghosts/__data.json","/ja/stages/ISW-NO_彷徨う影","/ja/stages/ISW-NO_彷徨う影/__data.json","/zh/stages/ISW-NO_违和","/zh/stages/ISW-NO_违和/__data.json","/en/stages/ISW-NO_Unwell","/en/stages/ISW-NO_Unwell/__data.json","/ja/stages/ISW-NO_違和感","/ja/stages/ISW-NO_違和感/__data.json","/zh/stages/ISW-NO_虫虫别回头","/zh/stages/ISW-NO_虫虫别回头/__data.json","/en/stages/ISW-NO_Don't_Turn_Around,_Sluggies","/en/stages/ISW-NO_Don't_Turn_Around,_Sluggies/__data.json","/ja/stages/ISW-NO_這い寄る崩壊","/ja/stages/ISW-NO_這い寄る崩壊/__data.json","/zh/stages/ISW-NO_还之彼身","/zh/stages/ISW-NO_还之彼身/__data.json","/en/stages/ISW-NO_Payback","/en/stages/ISW-NO_Payback/__data.json","/ja/stages/ISW-NO_目には目を","/ja/stages/ISW-NO_目には目を/__data.json","/zh/stages/ISW-NO_弄假成真","/zh/stages/ISW-NO_弄假成真/__data.json","/en/stages/ISW-NO_Pretense_Turned_True","/en/stages/ISW-NO_Pretense_Turned_True/__data.json","/ja/stages/ISW-NO_噓から出たまこと","/ja/stages/ISW-NO_噓から出たまこと/__data.json","/zh/stages/ISW-NO_饥渴祭坛","/zh/stages/ISW-NO_饥渴祭坛/__data.json","/en/stages/ISW-NO_Altar_of_Craving","/en/stages/ISW-NO_Altar_of_Craving/__data.json","/ja/stages/ISW-NO_渇きの祭壇","/ja/stages/ISW-NO_渇きの祭壇/__data.json","/zh/stages/ISW-NO_狡兽九窟","/zh/stages/ISW-NO_狡兽九窟/__data.json","/en/stages/ISW-NO_Crafty_Beasts'_Nine-Caves","/en/stages/ISW-NO_Crafty_Beasts'_Nine-Caves/__data.json","/ja/stages/ISW-NO_狡獣九窟","/ja/stages/ISW-NO_狡獣九窟/__data.json","/zh/stages/ISW-NO_冰海疑影","/zh/stages/ISW-NO_冰海疑影/__data.json","/en/stages/ISW-NO_Shady_Frozen_Sea","/en/stages/ISW-NO_Shady_Frozen_Sea/__data.json","/ja/stages/ISW-NO_氷海の虚像","/ja/stages/ISW-NO_氷海の虚像/__data.json","/zh/stages/ISW-NO_咫尺天涯","/zh/stages/ISW-NO_咫尺天涯/__data.json","/en/stages/ISW-NO_So_Close_and_Yet_So_Far","/en/stages/ISW-NO_So_Close_and_Yet_So_Far/__data.json","/ja/stages/ISW-NO_目先も天涯の隔たり","/ja/stages/ISW-NO_目先も天涯の隔たり/__data.json","/zh/stages/ISW-NO_思维折断","/zh/stages/ISW-NO_思维折断/__data.json","/en/stages/ISW-NO_Rational_Fracture","/en/stages/ISW-NO_Rational_Fracture/__data.json","/ja/stages/ISW-NO_途切れた思考","/ja/stages/ISW-NO_途切れた思考/__data.json","/zh/stages/ISW-NO_恃强凌弱","/zh/stages/ISW-NO_恃强凌弱/__data.json","/en/stages/ISW-NO_Harass_With_Strength","/en/stages/ISW-NO_Harass_With_Strength/__data.json","/ja/stages/ISW-NO_弱いものいじめ","/ja/stages/ISW-NO_弱いものいじめ/__data.json","/zh/stages/ISW-NO_公司纠葛","/zh/stages/ISW-NO_公司纠葛/__data.json","/en/stages/ISW-NO_Company_Entanglement","/en/stages/ISW-NO_Company_Entanglement/__data.json","/ja/stages/ISW-NO_企業間の確執","/ja/stages/ISW-NO_企業間の確執/__data.json","/zh/stages/ISW-NO_应用测试","/zh/stages/ISW-NO_应用测试/__data.json","/en/stages/ISW-NO_Practical_Test","/en/stages/ISW-NO_Practical_Test/__data.json","/ja/stages/ISW-NO_実証実験","/ja/stages/ISW-NO_実証実験/__data.json","/zh/stages/ISW-NO_坍缩体的午后","/zh/stages/ISW-NO_坍缩体的午后/__data.json","/en/stages/ISW-NO_Collapsals'_Afternoon","/en/stages/ISW-NO_Collapsals'_Afternoon/__data.json","/ja/stages/ISW-NO_崩壊体の午後","/ja/stages/ISW-NO_崩壊体の午後/__data.json","/zh/stages/ISW-NO_大迁徙","/zh/stages/ISW-NO_大迁徙/__data.json","/en/stages/ISW-NO_The_Big_Migration","/en/stages/ISW-NO_The_Big_Migration/__data.json","/ja/stages/ISW-NO_大移動","/ja/stages/ISW-NO_大移動/__data.json","/zh/stages/ISW-NO_以守代攻","/zh/stages/ISW-NO_以守代攻/__data.json","/en/stages/ISW-NO_Defense_Substituting_Offense","/en/stages/ISW-NO_Defense_Substituting_Offense/__data.json","/ja/stages/ISW-NO_防御は最大の攻撃","/ja/stages/ISW-NO_防御は最大の攻撃/__data.json","/zh/stages/ISW-NO_杂音干扰","/zh/stages/ISW-NO_杂音干扰/__data.json","/en/stages/ISW-NO_Noise_Disturbance","/en/stages/ISW-NO_Noise_Disturbance/__data.json","/ja/stages/ISW-NO_ノイズ干渉","/ja/stages/ISW-NO_ノイズ干渉/__data.json","/zh/stages/ISW-NO_禁区","/zh/stages/ISW-NO_禁区/__data.json","/en/stages/ISW-NO_Restricted_Zone","/en/stages/ISW-NO_Restricted_Zone/__data.json","/ja/stages/ISW-NO_禁止区域","/ja/stages/ISW-NO_禁止区域/__data.json","/zh/stages/ISW-NO_冰凝之所","/zh/stages/ISW-NO_冰凝之所/__data.json","/en/stages/ISW-NO_Where_Ice_Condenses","/en/stages/ISW-NO_Where_Ice_Condenses/__data.json","/ja/stages/ISW-NO_凍てついた地","/ja/stages/ISW-NO_凍てついた地/__data.json","/zh/stages/ISW-NO_乐理之灾","/zh/stages/ISW-NO_乐理之灾/__data.json","/en/stages/ISW-NO_Musical_Disaster","/en/stages/ISW-NO_Musical_Disaster/__data.json","/ja/stages/ISW-NO_音楽理論の災い","/ja/stages/ISW-NO_音楽理論の災い/__data.json","/zh/stages/ISW-NO_生人勿近","/zh/stages/ISW-NO_生人勿近/__data.json","/en/stages/ISW-NO_Stay_Away_From_Strangers","/en/stages/ISW-NO_Stay_Away_From_Strangers/__data.json","/ja/stages/ISW-NO_生の拒絶","/ja/stages/ISW-NO_生の拒絶/__data.json","/zh/stages/ISW-NO_混乱的表象","/zh/stages/ISW-NO_混乱的表象/__data.json","/en/stages/ISW-NO_Confusing_Appearance","/en/stages/ISW-NO_Confusing_Appearance/__data.json","/ja/stages/ISW-NO_混乱を呼ぶ表象","/ja/stages/ISW-NO_混乱を呼ぶ表象/__data.json","/zh/stages/ISW-NO_求敌得敌","/zh/stages/ISW-NO_求敌得敌/__data.json","/en/stages/ISW-NO_Requested_Enemies_Obtained","/en/stages/ISW-NO_Requested_Enemies_Obtained/__data.json","/ja/stages/ISW-NO_思い描けば敵を得る","/ja/stages/ISW-NO_思い描けば敵を得る/__data.json","/zh/stages/ISW-NO_亡者行军","/zh/stages/ISW-NO_亡者行军/__data.json","/en/stages/ISW-NO_March_of_the_Dead","/en/stages/ISW-NO_March_of_the_Dead/__data.json","/ja/stages/ISW-NO_死者の行軍","/ja/stages/ISW-NO_死者の行軍/__data.json","/zh/stages/ISW-NO_何处无山海","/zh/stages/ISW-NO_何处无山海/__data.json","/en/stages/ISW-NO_Where_be_No_Mounts_and_Seas","/en/stages/ISW-NO_Where_be_No_Mounts_and_Seas/__data.json","/ja/stages/ISW-NO_山海なき場所はなく","/ja/stages/ISW-NO_山海なき場所はなく/__data.json","/zh/stages/ISW-NO_本能污染","/zh/stages/ISW-NO_本能污染/__data.json","/en/stages/ISW-NO_Instinct_Contamination","/en/stages/ISW-NO_Instinct_Contamination/__data.json","/ja/stages/ISW-NO_本能の汚染","/ja/stages/ISW-NO_本能の汚染/__data.json","/zh/stages/ISW-NO_人造物狂欢节","/zh/stages/ISW-NO_人造物狂欢节/__data.json","/en/stages/ISW-NO_Manmade_Carnival","/en/stages/ISW-NO_Manmade_Carnival/__data.json","/ja/stages/ISW-NO_人工物のカーニバル","/ja/stages/ISW-NO_人工物のカーニバル/__data.json","/zh/stages/ISW-NO_霜与沙","/zh/stages/ISW-NO_霜与沙/__data.json","/en/stages/ISW-NO_Frost_and_Sand","/en/stages/ISW-NO_Frost_and_Sand/__data.json","/ja/stages/ISW-NO_霜と砂","/ja/stages/ISW-NO_霜と砂/__data.json","/zh/stages/ISW-NO_生灵的终点","/zh/stages/ISW-NO_生灵的终点/__data.json","/en/stages/ISW-NO_Terminus_of_Life","/en/stages/ISW-NO_Terminus_of_Life/__data.json","/ja/stages/ISW-NO_生命の果て","/ja/stages/ISW-NO_生命の果て/__data.json","/zh/stages/ISW-NO_守望的河水","/zh/stages/ISW-NO_守望的河水/__data.json","/en/stages/ISW-NO_River_Watcher","/en/stages/ISW-NO_River_Watcher/__data.json","/ja/stages/ISW-NO_見守りの河水","/ja/stages/ISW-NO_見守りの河水/__data.json","/zh/stages/ISW-NO_或然面纱","/zh/stages/ISW-NO_或然面纱/__data.json","/en/stages/ISW-NO_Veil_of_Probability","/en/stages/ISW-NO_Veil_of_Probability/__data.json","/ja/stages/ISW-NO_蓋然のベール","/ja/stages/ISW-NO_蓋然のベール/__data.json","/zh/stages/ISW-NO_离歌的庭院","/zh/stages/ISW-NO_离歌的庭院/__data.json","/en/stages/ISW-NO_Courtyard_of_Farewells","/en/stages/ISW-NO_Courtyard_of_Farewells/__data.json","/ja/stages/ISW-NO_別れの歌の庭","/ja/stages/ISW-NO_別れの歌の庭/__data.json","/zh/stages/ISW-NO_卫士不语功","/zh/stages/ISW-NO_卫士不语功/__data.json","/en/stages/ISW-NO_Silent_Guardian","/en/stages/ISW-NO_Silent_Guardian/__data.json","/ja/stages/ISW-NO_武勲を語らず","/ja/stages/ISW-NO_武勲を語らず/__data.json","/zh/stages/ISW-NO_奉献","/zh/stages/ISW-NO_奉献/__data.json","/en/stages/ISW-NO_Devoted_Warrior","/en/stages/ISW-NO_Devoted_Warrior/__data.json","/ja/stages/ISW-NO_友に捧げる","/ja/stages/ISW-NO_友に捧げる/__data.json","/zh/stages/ISW-NO_赴敌者","/zh/stages/ISW-NO_赴敌者/__data.json","/en/stages/ISW-NO_Brave_Souls_Marching","/en/stages/ISW-NO_Brave_Souls_Marching/__data.json","/ja/stages/ISW-NO_敵に立ち向かう者","/ja/stages/ISW-NO_敵に立ち向かう者/__data.json","/zh/stages/ISW-NO_存亡之战","/zh/stages/ISW-NO_存亡之战/__data.json","/en/stages/ISW-NO_Battle_of_Survival","/en/stages/ISW-NO_Battle_of_Survival/__data.json","/ja/stages/ISW-NO_存亡の戦い","/ja/stages/ISW-NO_存亡の戦い/__data.json","/zh/stages/ISW-NO_斩首","/zh/stages/ISW-NO_斩首/__data.json","/en/stages/ISW-NO_Decapitation","/en/stages/ISW-NO_Decapitation/__data.json","/ja/stages/ISW-NO_斬首","/ja/stages/ISW-NO_斬首/__data.json","/zh/stages/ISW-NO_王冠之下","/zh/stages/ISW-NO_王冠之下/__data.json","/en/stages/ISW-NO_Under_The_Crown","/en/stages/ISW-NO_Under_The_Crown/__data.json","/ja/stages/ISW-NO_王冠のもとに","/ja/stages/ISW-NO_王冠のもとに/__data.json","/zh/stages/ISW-DF_紧急授课","/zh/stages/ISW-DF_紧急授课/__data.json","/en/stages/ISW-DF_Emergency_Lecture","/en/stages/ISW-DF_Emergency_Lecture/__data.json","/ja/stages/ISW-DF_緊急授業","/ja/stages/ISW-DF_緊急授業/__data.json","/zh/stages/ISW-DF_思维矫正","/zh/stages/ISW-DF_思维矫正/__data.json","/en/stages/ISW-DF_Cognitive_Correction","/en/stages/ISW-DF_Cognitive_Correction/__data.json","/ja/stages/ISW-DF_思考矯正","/ja/stages/ISW-DF_思考矯正/__data.json","/zh/stages/ISW-DF_朝谒","/zh/stages/ISW-DF_朝谒/__data.json","/en/stages/ISW-DF_Court_Visit","/en/stages/ISW-DF_Court_Visit/__data.json","/ja/stages/ISW-DF_謁見","/ja/stages/ISW-DF_謁見/__data.json","/zh/stages/ISW-DF_魂灵朝谒","/zh/stages/ISW-DF_魂灵朝谒/__data.json","/en/stages/ISW-DF_The_Court_of_Souls","/en/stages/ISW-DF_The_Court_of_Souls/__data.json","/ja/stages/ISW-DF_魂の謁見","/ja/stages/ISW-DF_魂の謁見/__data.json","/zh/stages/ISW-DF_圣城","/zh/stages/ISW-DF_圣城/__data.json","/en/stages/ISW-DF_Holy_City","/en/stages/ISW-DF_Holy_City/__data.json","/ja/stages/ISW-DF_聖都","/ja/stages/ISW-DF_聖都/__data.json","/zh/stages/ISW-DF_授法","/zh/stages/ISW-DF_授法/__data.json","/en/stages/ISW-DF_The_Dharma_Sermon","/en/stages/ISW-DF_The_Dharma_Sermon/__data.json","/ja/stages/ISW-DF_説法","/ja/stages/ISW-DF_説法/__data.json","/zh/stages/ISW-DF_不容拒绝","/zh/stages/ISW-DF_不容拒绝/__data.json","/en/stages/ISW-DF_Fate's_Finale","/en/stages/ISW-DF_Fate's_Finale/__data.json","/ja/stages/ISW-DF_拒絶は許さぬ","/ja/stages/ISW-DF_拒絶は許さぬ/__data.json","/en/stages/ro4_b_9","/en/stages/ro4_b_9/__data.json","/ja/stages/ro4_b_9","/ja/stages/ro4_b_9/__data.json","/zh/stages/ro4_b_9","/zh/stages/ro4_b_9/__data.json","/zh/stages/ISW-SP_失败的试胆","/zh/stages/ISW-SP_失败的试胆/__data.json","/en/stages/ISW-SP_Failed_Dare","/en/stages/ISW-SP_Failed_Dare/__data.json","/ja/stages/ISW-SP_肝試し失敗","/ja/stages/ISW-SP_肝試し失敗/__data.json","/zh/stages/ISW-SP_信号灯","/zh/stages/ISW-SP_信号灯/__data.json","/en/stages/ISW-SP_Signal_Light","/en/stages/ISW-SP_Signal_Light/__data.json","/ja/stages/ISW-SP_信号","/ja/stages/ISW-SP_信号/__data.json","/zh/stages/ISW-SP_劫虚济实","/zh/stages/ISW-SP_劫虚济实/__data.json","/en/stages/ISW-SP_Illusory_Heist","/en/stages/ISW-SP_Illusory_Heist/__data.json","/ja/stages/ISW-SP_突きつける現実","/ja/stages/ISW-SP_突きつける現実/__data.json","/zh/stages/ISW-SP_鸭速公路","/zh/stages/ISW-SP_鸭速公路/__data.json","/en/stages/ISW-SP_Duck-Speed_Highway","/en/stages/ISW-SP_Duck-Speed_Highway/__data.json","/ja/stages/ISW-SP_ダックロード","/ja/stages/ISW-SP_ダックロード/__data.json","/zh/stages/ISW-SP_战场侧面","/zh/stages/ISW-SP_战场侧面/__data.json","/en/stages/ISW-SP_Beside_The_Battlefield","/en/stages/ISW-SP_Beside_The_Battlefield/__data.json","/ja/stages/ISW-SP_戦場の一側面","/ja/stages/ISW-SP_戦場の一側面/__data.json","/zh/stages/ISW-SP_继承","/zh/stages/ISW-SP_继承/__data.json","/en/stages/ISW-SP_Legacy","/en/stages/ISW-SP_Legacy/__data.json","/ja/stages/ISW-SP_継承","/ja/stages/ISW-SP_継承/__data.json","/zh/stages/ISW-DF_时光凯旋","/zh/stages/ISW-DF_时光凯旋/__data.json","/en/stages/ISW-DF_Victory_Rewind","/en/stages/ISW-DF_Victory_Rewind/__data.json","/ja/stages/ISW-DF_タイムスリップ","/ja/stages/ISW-DF_タイムスリップ/__data.json","/zh/stages/ISW-SP_玩具的报复","/zh/stages/ISW-SP_玩具的报复/__data.json","/en/stages/ISW-SP_Revenge_of_the_Toys","/en/stages/ISW-SP_Revenge_of_the_Toys/__data.json","/ja/stages/ISW-SP_おもちゃの復讐劇","/ja/stages/ISW-SP_おもちゃの復讐劇/__data.json","/zh/stages/ISW-SP_物权纠纷","/zh/stages/ISW-SP_物权纠纷/__data.json","/en/stages/ISW-SP_Property_Dispute","/en/stages/ISW-SP_Property_Dispute/__data.json","/ja/stages/ISW-SP_所有権を巡る闘争","/ja/stages/ISW-SP_所有権を巡る闘争/__data.json","/zh/stages/ISW-SP_叙事要约","/zh/stages/ISW-SP_叙事要约/__data.json","/en/stages/ISW-SP_Narrative_Offer","/en/stages/ISW-SP_Narrative_Offer/__data.json","/ja/stages/ISW-SP_叙事の要約","/ja/stages/ISW-SP_叙事の要約/__data.json","/zh/stages/ISW-NO_以血还血","/zh/stages/ISW-NO_以血还血/__data.json","/en/stages/ISW-NO_Eye_For_an_Eye","/en/stages/ISW-NO_Eye_For_an_Eye/__data.json","/ja/stages/ISW-NO_血には血を","/ja/stages/ISW-NO_血には血を/__data.json","/zh/stages/ISW-NO_善恶同道","/zh/stages/ISW-NO_善恶同道/__data.json","/en/stages/ISW-NO_Narrow_Path","/en/stages/ISW-NO_Narrow_Path/__data.json","/ja/stages/ISW-NO_善悪同道","/ja/stages/ISW-NO_善悪同道/__data.json","/zh/stages/ISW-NO_石心双子","/zh/stages/ISW-NO_石心双子/__data.json","/en/stages/ISW-NO_Twin_Gargoyles","/en/stages/ISW-NO_Twin_Gargoyles/__data.json","/ja/stages/ISW-NO_石心の双子","/ja/stages/ISW-NO_石心の双子/__data.json","/zh/stages/ISW-NO_轻舟共渡","/zh/stages/ISW-NO_轻舟共渡/__data.json","/en/stages/ISW-NO_The_Boat_Home","/en/stages/ISW-NO_The_Boat_Home/__data.json","/ja/stages/ISW-NO_軽舟ともに渡る","/ja/stages/ISW-NO_軽舟ともに渡る/__data.json","/zh/stages/ISW-NO_坏邻居","/zh/stages/ISW-NO_坏邻居/__data.json","/en/stages/ISW-NO_Bad_Neighbors","/en/stages/ISW-NO_Bad_Neighbors/__data.json","/ja/stages/ISW-NO_悪しき隣人","/ja/stages/ISW-NO_悪しき隣人/__data.json","/ja/stages/ISW-NO_公害","/ja/stages/ISW-NO_公害/__data.json","/en/stages/ISW-NO_Vermin","/en/stages/ISW-NO_Vermin/__data.json","/zh/stages/ISW-NO_安全检查","/zh/stages/ISW-NO_安全检查/__data.json","/en/stages/ISW-NO_Safety_Inspection","/en/stages/ISW-NO_Safety_Inspection/__data.json","/ja/stages/ISW-NO_安全点検","/ja/stages/ISW-NO_安全点検/__data.json","/zh/stages/ISW-NO_夺路而跳","/zh/stages/ISW-NO_夺路而跳/__data.json","/en/stages/ISW-NO_Hasty_Escape","/en/stages/ISW-NO_Hasty_Escape/__data.json","/ja/stages/ISW-NO_逃げよ跳べよ","/ja/stages/ISW-NO_逃げよ跳べよ/__data.json","/zh/stages/ISW-NO_冰川期","/zh/stages/ISW-NO_冰川期/__data.json","/en/stages/ISW-NO_Ice_Age","/en/stages/ISW-NO_Ice_Age/__data.json","/ja/stages/ISW-NO_氷河期","/ja/stages/ISW-NO_氷河期/__data.json","/zh/stages/ISW-NO_见闻峰会","/zh/stages/ISW-NO_见闻峰会/__data.json","/en/stages/ISW-NO_Dissuasion_Seminar","/en/stages/ISW-NO_Dissuasion_Seminar/__data.json","/ja/stages/ISW-NO_情報サミット","/ja/stages/ISW-NO_情報サミット/__data.json","/zh/stages/ISW-NO_拆东补西","/zh/stages/ISW-NO_拆东补西/__data.json","/en/stages/ISW-NO_Temporary_Patchup","/en/stages/ISW-NO_Temporary_Patchup/__data.json","/ja/stages/ISW-NO_その場しのぎ","/ja/stages/ISW-NO_その場しのぎ/__data.json","/zh/stages/ISW-NO_排风口","/zh/stages/ISW-NO_排风口/__data.json","/en/stages/ISW-NO_Exhaust_Vents","/en/stages/ISW-NO_Exhaust_Vents/__data.json","/ja/stages/ISW-NO_排気口","/ja/stages/ISW-NO_排気口/__data.json","/zh/stages/ISW-NO_炉工志愿队","/zh/stages/ISW-NO_炉工志愿队/__data.json","/en/stages/ISW-NO_Furnace_Volunteers","/en/stages/ISW-NO_Furnace_Volunteers/__data.json","/ja/stages/ISW-NO_ボイラーマン志願隊","/ja/stages/ISW-NO_ボイラーマン志願隊/__data.json","/zh/stages/ISW-NO_有序清场","/zh/stages/ISW-NO_有序清场/__data.json","/en/stages/ISW-NO_Clear_the_Crowd","/en/stages/ISW-NO_Clear_the_Crowd/__data.json","/ja/stages/ISW-NO_次の方どうぞ","/ja/stages/ISW-NO_次の方どうぞ/__data.json","/zh/stages/ISW-NO_卡兹瀑布","/zh/stages/ISW-NO_卡兹瀑布/__data.json","/en/stages/ISW-NO_Kaz_Falls","/en/stages/ISW-NO_Kaz_Falls/__data.json","/ja/stages/ISW-NO_ムシカズの滝","/ja/stages/ISW-NO_ムシカズの滝/__data.json","/zh/stages/ISW-NO_丛林密布","/zh/stages/ISW-NO_丛林密布/__data.json","/en/stages/ISW-NO_Dense_Jungle","/en/stages/ISW-NO_Dense_Jungle/__data.json","/ja/stages/ISW-NO_生い茂る密林","/ja/stages/ISW-NO_生い茂る密林/__data.json","/zh/stages/ISW-NO_大棋一盘","/zh/stages/ISW-NO_大棋一盘/__data.json","/en/stages/ISW-NO_Simulated_Skirmish","/en/stages/ISW-NO_Simulated_Skirmish/__data.json","/ja/stages/ISW-NO_大規模演習","/ja/stages/ISW-NO_大規模演習/__data.json","/zh/stages/ISW-NO_血脉之辩","/zh/stages/ISW-NO_血脉之辩/__data.json","/en/stages/ISW-NO_Bloodline_Debates","/en/stages/ISW-NO_Bloodline_Debates/__data.json","/ja/stages/ISW-NO_血脈に関する議論","/ja/stages/ISW-NO_血脈に関する議論/__data.json","/zh/stages/ISW-NO_遮天蔽日","/zh/stages/ISW-NO_遮天蔽日/__data.json","/en/stages/ISW-NO_Blotted_Sky","/en/stages/ISW-NO_Blotted_Sky/__data.json","/ja/stages/ISW-NO_大きな日陰","/ja/stages/ISW-NO_大きな日陰/__data.json","/zh/stages/ISW-NO_劳作的清晨","/zh/stages/ISW-NO_劳作的清晨/__data.json","/en/stages/ISW-NO_Morning_Labor","/en/stages/ISW-NO_Morning_Labor/__data.json","/ja/stages/ISW-NO_労働の朝","/ja/stages/ISW-NO_労働の朝/__data.json","/zh/stages/ISW-NO_溃乱魔典","/zh/stages/ISW-NO_溃乱魔典/__data.json","/en/stages/ISW-NO_Careless_Magic","/en/stages/ISW-NO_Careless_Magic/__data.json","/ja/stages/ISW-NO_混乱の魔典","/ja/stages/ISW-NO_混乱の魔典/__data.json","/zh/stages/ISW-NO_盲盒商场","/zh/stages/ISW-NO_盲盒商场/__data.json","/en/stages/ISW-NO_Lottery_Fight","/en/stages/ISW-NO_Lottery_Fight/__data.json","/ja/stages/ISW-NO_ブラインドボックス市場","/ja/stages/ISW-NO_ブラインドボックス市場/__data.json","/zh/stages/ISW-NO_火力小队","/zh/stages/ISW-NO_火力小队/__data.json","/en/stages/ISW-NO_Firepower_Squad","/en/stages/ISW-NO_Firepower_Squad/__data.json","/ja/stages/ISW-NO_火力小隊","/ja/stages/ISW-NO_火力小隊/__data.json","/zh/stages/ISW-NO_机动队","/zh/stages/ISW-NO_机动队/__data.json","/en/stages/ISW-NO_Motorized_Squad","/en/stages/ISW-NO_Motorized_Squad/__data.json","/ja/stages/ISW-NO_機動隊","/ja/stages/ISW-NO_機動隊/__data.json","/zh/stages/ISW-NO_年代断层","/zh/stages/ISW-NO_年代断层/__data.json","/en/stages/ISW-NO_Epochal_Gaps","/en/stages/ISW-NO_Epochal_Gaps/__data.json","/ja/stages/ISW-NO_時代の断層","/ja/stages/ISW-NO_時代の断層/__data.json","/zh/stages/ISW-NO_朽败考察","/zh/stages/ISW-NO_朽败考察/__data.json","/en/stages/ISW-NO_Sordid_Surveillance","/en/stages/ISW-NO_Sordid_Surveillance/__data.json","/ja/stages/ISW-NO_腐朽の考察","/ja/stages/ISW-NO_腐朽の考察/__data.json","/zh/stages/ISW-NO_飞越大水坑","/zh/stages/ISW-NO_飞越大水坑/__data.json","/en/stages/ISW-NO_Past_The_Aquapit","/en/stages/ISW-NO_Past_The_Aquapit/__data.json","/ja/stages/ISW-NO_水たまりを飛び越えて","/ja/stages/ISW-NO_水たまりを飛び越えて/__data.json","/zh/stages/ISW-NO_猩红甬道","/zh/stages/ISW-NO_猩红甬道/__data.json","/en/stages/ISW-NO_Crimson_Corridor","/en/stages/ISW-NO_Crimson_Corridor/__data.json","/ja/stages/ISW-NO_緋色の小道","/ja/stages/ISW-NO_緋色の小道/__data.json","/zh/stages/ISW-NO_现代战争法则","/zh/stages/ISW-NO_现代战争法则/__data.json","/en/stages/ISW-NO_Rules_of_Modern_Warfare","/en/stages/ISW-NO_Rules_of_Modern_Warfare/__data.json","/ja/stages/ISW-NO_現代戦争の法則","/ja/stages/ISW-NO_現代戦争の法則/__data.json","/zh/stages/ISW-NO_假想对冲","/zh/stages/ISW-NO_假想对冲/__data.json","/en/stages/ISW-NO_Timeworn_Tensions","/en/stages/ISW-NO_Timeworn_Tensions/__data.json","/ja/stages/ISW-NO_仮説の衝突","/ja/stages/ISW-NO_仮説の衝突/__data.json","/zh/stages/ISW-NO_幽灵城","/zh/stages/ISW-NO_幽灵城/__data.json","/en/stages/ISW-NO_Ghost_City","/en/stages/ISW-NO_Ghost_City/__data.json","/ja/stages/ISW-NO_ゴーストシティ","/ja/stages/ISW-NO_ゴーストシティ/__data.json","/ja/stages/ISW-NO_神出鬼没","/ja/stages/ISW-NO_神出鬼没/__data.json","/en/stages/ISW-NO_Elusive_Merc","/en/stages/ISW-NO_Elusive_Merc/__data.json","/ja/stages/ISW-NO_混沌","/ja/stages/ISW-NO_混沌/__data.json","/en/stages/ISW-NO_Chaos","/en/stages/ISW-NO_Chaos/__data.json","/zh/stages/ISW-NO_争议频发","/zh/stages/ISW-NO_争议频发/__data.json","/en/stages/ISW-NO_Frequent_Dispute","/en/stages/ISW-NO_Frequent_Dispute/__data.json","/ja/stages/ISW-NO_論争頻発","/ja/stages/ISW-NO_論争頻発/__data.json","/zh/stages/ISW-NO_寄人城池下","/zh/stages/ISW-NO_寄人城池下/__data.json","/en/stages/ISW-NO_Rogue_Mercenary","/en/stages/ISW-NO_Rogue_Mercenary/__data.json","/ja/stages/ISW-NO_都市に身を寄せて","/ja/stages/ISW-NO_都市に身を寄せて/__data.json","/zh/stages/ISW-NO_计划耕种","/zh/stages/ISW-NO_计划耕种/__data.json","/en/stages/ISW-NO_Land_Reclamation","/en/stages/ISW-NO_Land_Reclamation/__data.json","/ja/stages/ISW-NO_計画的な開墾","/ja/stages/ISW-NO_計画的な開墾/__data.json","/zh/stages/ISW-NO_巫咒同盟","/zh/stages/ISW-NO_巫咒同盟/__data.json","/en/stages/ISW-NO_Witch-Curse_Alliance","/en/stages/ISW-NO_Witch-Curse_Alliance/__data.json","/ja/stages/ISW-NO_巫術とアーツの同盟","/ja/stages/ISW-NO_巫術とアーツの同盟/__data.json","/zh/stages/ISW-NO_通道封锁","/zh/stages/ISW-NO_通道封锁/__data.json","/en/stages/ISW-NO_Passage_Blockade","/en/stages/ISW-NO_Passage_Blockade/__data.json","/ja/stages/ISW-NO_道路封鎖","/ja/stages/ISW-NO_道路封鎖/__data.json","/zh/stages/ISW-NO_无罪净土","/zh/stages/ISW-NO_无罪净土/__data.json","/en/stages/ISW-NO_Guiltless_Paradise","/en/stages/ISW-NO_Guiltless_Paradise/__data.json","/ja/stages/ISW-NO_無辜なる浄土","/ja/stages/ISW-NO_無辜なる浄土/__data.json","/zh/stages/ISW-NO_浮空城接舷战","/zh/stages/ISW-NO_浮空城接舷战/__data.json","/en/stages/ISW-NO_Aerial_Assault","/en/stages/ISW-NO_Aerial_Assault/__data.json","/ja/stages/ISW-NO_天空都市移乗戦","/ja/stages/ISW-NO_天空都市移乗戦/__data.json","/zh/stages/ISW-NO_残损学院","/zh/stages/ISW-NO_残损学院/__data.json","/en/stages/ISW-NO_Wrecked_Academy","/en/stages/ISW-NO_Wrecked_Academy/__data.json","/ja/stages/ISW-NO_欠け落ちた学院","/ja/stages/ISW-NO_欠け落ちた学院/__data.json","/zh/stages/ISW-NO_建制","/zh/stages/ISW-NO_建制/__data.json","/en/stages/ISW-NO_Regular_Army","/en/stages/ISW-NO_Regular_Army/__data.json","/ja/stages/ISW-NO_サルカズの軍隊","/ja/stages/ISW-NO_サルカズの軍隊/__data.json","/zh/stages/ISW-NO_莱茵卫士","/zh/stages/ISW-NO_莱茵卫士/__data.json","/en/stages/ISW-NO_Rhine_Guardians","/en/stages/ISW-NO_Rhine_Guardians/__data.json","/ja/stages/ISW-NO_ライン生命の警備体制","/ja/stages/ISW-NO_ライン生命の警備体制/__data.json","/zh/stages/ISW-NO_谋求共识","/zh/stages/ISW-NO_谋求共识/__data.json","/en/stages/ISW-NO_Quest_For_Consensus","/en/stages/ISW-NO_Quest_For_Consensus/__data.json","/ja/stages/ISW-NO_合意を求めて","/ja/stages/ISW-NO_合意を求めて/__data.json","/zh/stages/ISW-NO_神圣的渴求","/zh/stages/ISW-NO_神圣的渴求/__data.json","/en/stages/ISW-NO_Divine_Desire","/en/stages/ISW-NO_Divine_Desire/__data.json","/ja/stages/ISW-NO_聖なる渇望","/ja/stages/ISW-NO_聖なる渇望/__data.json","/ja/stages/ISW-NO_洞天福地","/ja/stages/ISW-NO_洞天福地/__data.json","/en/stages/ISW-NO_Heavenly_Paradise","/en/stages/ISW-NO_Heavenly_Paradise/__data.json","/zh/stages/ISW-NO_“外道”","/zh/stages/ISW-NO_“外道”/__data.json","/en/stages/ISW-NO_'Heretics'","/en/stages/ISW-NO_'Heretics'/__data.json","/ja/stages/ISW-NO_「外道」","/ja/stages/ISW-NO_「外道」/__data.json","/zh/stages/ISW-NO_月华寒","/zh/stages/ISW-NO_月华寒/__data.json","/en/stages/ISW-NO_Cold_Moonlight","/en/stages/ISW-NO_Cold_Moonlight/__data.json","/ja/stages/ISW-NO_月華の寒気","/ja/stages/ISW-NO_月華の寒気/__data.json","/zh/stages/ISW-NO_夕娥忆","/zh/stages/ISW-NO_夕娥忆/__data.json","/en/stages/ISW-NO_Memories_of_Dusk_Beauty","/en/stages/ISW-NO_Memories_of_Dusk_Beauty/__data.json","/ja/stages/ISW-NO_夕娥の記憶","/ja/stages/ISW-NO_夕娥の記憶/__data.json","/zh/stages/ISW-NO_剑·刀·矛","/zh/stages/ISW-NO_剑·刀·矛/__data.json","/en/stages/ISW-NO_Sword,_Glaive,_Spear","/en/stages/ISW-NO_Sword,_Glaive,_Spear/__data.json","/ja/stages/ISW-NO_剣・刀・矛","/ja/stages/ISW-NO_剣・刀・矛/__data.json","/zh/stages/ISW-NO_仁·义·武","/zh/stages/ISW-NO_仁·义·武/__data.json","/en/stages/ISW-NO_Compassion,_Justice,_Valor","/en/stages/ISW-NO_Compassion,_Justice,_Valor/__data.json","/ja/stages/ISW-NO_仁・義・武","/ja/stages/ISW-NO_仁・義・武/__data.json","/zh/stages/ISW-NO_点化","/zh/stages/ISW-NO_点化/__data.json","/en/stages/ISW-NO_Enlightenment","/en/stages/ISW-NO_Enlightenment/__data.json","/ja/stages/ISW-NO_教え導く","/ja/stages/ISW-NO_教え導く/__data.json","/ja/stages/ISW-NO_求道","/ja/stages/ISW-NO_求道/__data.json","/en/stages/ISW-NO_Seeking_the_Way","/en/stages/ISW-NO_Seeking_the_Way/__data.json","/zh/stages/ISW-DF_破岁阵祀","/zh/stages/ISW-DF_破岁阵祀/__data.json","/en/stages/ISW-DF_The_Suppression_of_Sui","/en/stages/ISW-DF_The_Suppression_of_Sui/__data.json","/ja/stages/ISW-DF_歳破りし陣を祀る","/ja/stages/ISW-DF_歳破りし陣を祀る/__data.json","/zh/stages/ISW-DF_天数将易","/zh/stages/ISW-DF_天数将易/__data.json","/en/stages/ISW-DF_A_Change_of_Fate","/en/stages/ISW-DF_A_Change_of_Fate/__data.json","/ja/stages/ISW-DF_天命将に易えんとす","/ja/stages/ISW-DF_天命将に易えんとす/__data.json","/zh/stages/ISW-DF_昔字如烟","/zh/stages/ISW-DF_昔字如烟/__data.json","/en/stages/ISW-DF_Words_Past_Like_Smoke","/en/stages/ISW-DF_Words_Past_Like_Smoke/__data.json","/ja/stages/ISW-DF_古き文字は煙の如し","/ja/stages/ISW-DF_古き文字は煙の如し/__data.json","/zh/stages/ISW-DF_往昔难忆","/zh/stages/ISW-DF_往昔难忆/__data.json","/en/stages/ISW-DF_Near-Forgotten","/en/stages/ISW-DF_Near-Forgotten/__data.json","/ja/stages/ISW-DF_往昔は憶い難し","/ja/stages/ISW-DF_往昔は憶い難し/__data.json","/zh/stages/ISW-DF_谋岁者","/zh/stages/ISW-DF_谋岁者/__data.json","/en/stages/ISW-DF_The_Sui_Strategist","/en/stages/ISW-DF_The_Sui_Strategist/__data.json","/ja/stages/ISW-DF_歳を謀る者","/ja/stages/ISW-DF_歳を謀る者/__data.json","/ja/stages/ISW-DF_末狩","/ja/stages/ISW-DF_末狩/__data.json","/en/stages/ISW-DF_The_Last_Hunt","/en/stages/ISW-DF_The_Last_Hunt/__data.json","/zh/stages/ISW-DF_录忆","/zh/stages/ISW-DF_录忆/__data.json","/en/stages/ISW-DF_Recorded_Memory","/en/stages/ISW-DF_Recorded_Memory/__data.json","/ja/stages/ISW-DF_録憶","/ja/stages/ISW-DF_録憶/__data.json","/zh/stages/ISW-DF_止变","/zh/stages/ISW-DF_止变/__data.json","/en/stages/ISW-DF_Stasis","/en/stages/ISW-DF_Stasis/__data.json","/ja/stages/ISW-DF_止変","/ja/stages/ISW-DF_止変/__data.json","/zh/stages/ISW-DF_定乾坤","/zh/stages/ISW-DF_定乾坤/__data.json","/en/stages/ISW-DF_Defining_the_World","/en/stages/ISW-DF_Defining_the_World/__data.json","/zh/stages/ISW-SP_源源不断","/zh/stages/ISW-SP_源源不断/__data.json","/en/stages/ISW-SP_Steady_Stream","/en/stages/ISW-SP_Steady_Stream/__data.json","/ja/stages/ISW-SP_底なし","/ja/stages/ISW-SP_底なし/__data.json","/zh/stages/ISW-SP_闪闪发光","/zh/stages/ISW-SP_闪闪发光/__data.json","/en/stages/ISW-SP_Sparkling_Shine","/en/stages/ISW-SP_Sparkling_Shine/__data.json","/ja/stages/ISW-SP_きらきら輝いて","/ja/stages/ISW-SP_きらきら輝いて/__data.json","/zh/stages/ISW-SP_循循善诱","/zh/stages/ISW-SP_循循善诱/__data.json","/en/stages/ISW-SP_Reeducation","/en/stages/ISW-SP_Reeducation/__data.json","/ja/stages/ISW-SP_商売禁止","/ja/stages/ISW-SP_商売禁止/__data.json","/zh/stages/ISW-SP_易易鸭鸭","/zh/stages/ISW-SP_易易鸭鸭/__data.json","/en/stages/ISW-SP_Duck_and_Yi","/en/stages/ISW-SP_Duck_and_Yi/__data.json","/ja/stages/ISW-SP_良いカモ","/ja/stages/ISW-SP_良いカモ/__data.json","/zh/stages/ISW-SP_劫罚","/zh/stages/ISW-SP_劫罚/__data.json","/en/stages/ISW-SP_Calamitous_Punishment","/en/stages/ISW-SP_Calamitous_Punishment/__data.json","/ja/stages/ISW-SP_劫罰","/ja/stages/ISW-SP_劫罰/__data.json","/zh/stages/ISW-SP_生百相","/zh/stages/ISW-SP_生百相/__data.json","/en/stages/ISW-SP_Of_Hundred_Forms","/en/stages/ISW-SP_Of_Hundred_Forms/__data.json","/ja/stages/ISW-SP_生ける百面相","/ja/stages/ISW-SP_生ける百面相/__data.json","/zh/stages/ISW-DF_硕果累累","/zh/stages/ISW-DF_硕果累累/__data.json","/en/stages/ISW-DF_Feast_of_Fruit","/en/stages/ISW-DF_Feast_of_Fruit/__data.json","/ja/stages/ISW-DF_鈴なりの果実","/ja/stages/ISW-DF_鈴なりの果実/__data.json","/zh/stages/ISW-SP_以逸待劳","/zh/stages/ISW-SP_以逸待劳/__data.json","/en/stages/ISW-SP_Biding_Time","/en/stages/ISW-SP_Biding_Time/__data.json","/ja/stages/ISW-SP_逸を以て労を待つ","/ja/stages/ISW-SP_逸を以て労を待つ/__data.json","/zh/stages/ISW-SP_喜从驮来","/zh/stages/ISW-SP_喜从驮来/__data.json","/en/stages/ISW-SP_Joy_From_Burdenbeast","/en/stages/ISW-SP_Joy_From_Burdenbeast/__data.json","/ja/stages/ISW-SP_喜びは駄獣より来たる","/ja/stages/ISW-SP_喜びは駄獣より来たる/__data.json","/zh/stages/ISW-SP_硅基伥的宴席","/zh/stages/ISW-SP_硅基伥的宴席/__data.json","/en/stages/ISW-SP_Silicon_Geist's_Banquet","/en/stages/ISW-SP_Silicon_Geist's_Banquet/__data.json","/ja/stages/ISW-SP_ケイ素器鬼の宴","/ja/stages/ISW-SP_ケイ素器鬼の宴/__data.json","/zh/stages/ISW-SP_彻底失控","/zh/stages/ISW-SP_彻底失控/__data.json","/en/stages/ISW-SP_Totally_Out_of_Control","/en/stages/ISW-SP_Totally_Out_of_Control/__data.json","/ja/stages/ISW-SP_完全制御不能","/ja/stages/ISW-SP_完全制御不能/__data.json","/zh/stages/ISW-SP_为崖作伥","/zh/stages/ISW-SP_为崖作伥/__data.json","/en/stages/ISW-SP_Cliff_of_Geists","/en/stages/ISW-SP_Cliff_of_Geists/__data.json","/ja/stages/ISW-SP_崖の下の器鬼","/ja/stages/ISW-SP_崖の下の器鬼/__data.json","/zh/stages/ISW-SP_神游天外","/zh/stages/ISW-SP_神游天外/__data.json","/en/stages/ISW-SP_Astral_Projection","/en/stages/ISW-SP_Astral_Projection/__data.json","/ja/stages/ISW-SP_心ここにあらず","/ja/stages/ISW-SP_心ここにあらず/__data.json","/zh/stages/ISW-SP_作壁上观","/zh/stages/ISW-SP_作壁上观/__data.json","/en/stages/ISW-SP_Sit_Back_and_Watch","/en/stages/ISW-SP_Sit_Back_and_Watch/__data.json","/ja/stages/ISW-SP_高みの見物","/ja/stages/ISW-SP_高みの見物/__data.json","/zh/stages/ISW-NO_夕江对擂","/zh/stages/ISW-NO_夕江对擂/__data.json","/en/stages/ISW-NO_Bout_by_the_Dusk_River","/en/stages/ISW-NO_Bout_by_the_Dusk_River/__data.json","/ja/stages/ISW-NO_夕江にて対擂す","/ja/stages/ISW-NO_夕江にて対擂す/__data.json","/ja/stages/ISW-NO_南武群英会","/ja/stages/ISW-NO_南武群英会/__data.json","/en/stages/ISW-NO_Heroes_of_Nanwu","/en/stages/ISW-NO_Heroes_of_Nanwu/__data.json","/zh/stages/ISW-NO_夕江诀","/zh/stages/ISW-NO_夕江诀/__data.json","/en/stages/ISW-NO_Dusk_River_Sayings","/en/stages/ISW-NO_Dusk_River_Sayings/__data.json","/ja/stages/ISW-NO_夕江訣","/ja/stages/ISW-NO_夕江訣/__data.json","/zh/stages/ISW-NO_南武约","/zh/stages/ISW-NO_南武约/__data.json","/en/stages/ISW-NO_Nanwu_Vows","/en/stages/ISW-NO_Nanwu_Vows/__data.json","/ja/stages/ISW-NO_南武約","/ja/stages/ISW-NO_南武約/__data.json","/zh/stages/ISW-NO_谤天(双)","/zh/stages/ISW-NO_谤天(双)/__data.json","/en/stages/ISW-NO_Slandering_Heaven_(2)","/en/stages/ISW-NO_Slandering_Heaven_(2)/__data.json","/ja/stages/ISW-NO_謗天(双)","/ja/stages/ISW-NO_謗天(双)/__data.json","/zh/stages/ISW-NO_谤天(单)","/zh/stages/ISW-NO_谤天(单)/__data.json","/en/stages/ISW-NO_Slandering_Heaven_(1)","/en/stages/ISW-NO_Slandering_Heaven_(1)/__data.json","/ja/stages/ISW-NO_謗天(単)","/ja/stages/ISW-NO_謗天(単)/__data.json","/ja/stages/ISW-NO_迎雷(双)","/ja/stages/ISW-NO_迎雷(双)/__data.json","/en/stages/ISW-NO_Amidst_Thunder_(2)","/en/stages/ISW-NO_Amidst_Thunder_(2)/__data.json","/zh/stages/ISW-NO_迎雷(单)","/zh/stages/ISW-NO_迎雷(单)/__data.json","/en/stages/ISW-NO_Amidst_Thunder_(1)","/en/stages/ISW-NO_Amidst_Thunder_(1)/__data.json","/ja/stages/ISW-NO_迎雷(単)","/ja/stages/ISW-NO_迎雷(単)/__data.json","/ja/stages/ISW-NO_蔑震(双)","/ja/stages/ISW-NO_蔑震(双)/__data.json","/en/stages/ISW-NO_Defying_Quakes_(2)","/en/stages/ISW-NO_Defying_Quakes_(2)/__data.json","/zh/stages/ISW-NO_蔑震(单)","/zh/stages/ISW-NO_蔑震(单)/__data.json","/en/stages/ISW-NO_Defying_Quakes_(1)","/en/stages/ISW-NO_Defying_Quakes_(1)/__data.json","/ja/stages/ISW-NO_蔑震(単)","/ja/stages/ISW-NO_蔑震(単)/__data.json","/zh/stages/ISW-NO_赴陨(双)","/zh/stages/ISW-NO_赴陨(双)/__data.json","/en/stages/ISW-NO_To_the_Fall_(2)","/en/stages/ISW-NO_To_the_Fall_(2)/__data.json","/ja/stages/ISW-NO_赴隕(双)","/ja/stages/ISW-NO_赴隕(双)/__data.json","/zh/stages/ISW-NO_赴陨(单)","/zh/stages/ISW-NO_赴陨(单)/__data.json","/en/stages/ISW-NO_To_the_Fall_(1)","/en/stages/ISW-NO_To_the_Fall_(1)/__data.json","/ja/stages/ISW-NO_赴隕(単)","/ja/stages/ISW-NO_赴隕(単)/__data.json","/ja/stages/ISW-NO_斥洪(双)","/ja/stages/ISW-NO_斥洪(双)/__data.json","/en/stages/ISW-NO_Against_the_Flood_(2)","/en/stages/ISW-NO_Against_the_Flood_(2)/__data.json","/zh/stages/ISW-NO_斥洪(单)","/zh/stages/ISW-NO_斥洪(单)/__data.json","/en/stages/ISW-NO_Against_the_Flood_(1)","/en/stages/ISW-NO_Against_the_Flood_(1)/__data.json","/ja/stages/ISW-NO_斥洪(単)","/ja/stages/ISW-NO_斥洪(単)/__data.json","/zh/stages/ISW-NO_分明","/zh/stages/ISW-NO_分明/__data.json","/en/stages/ISW-NO_Clarity","/en/stages/ISW-NO_Clarity/__data.json","/ja/stages/ISW-NO_明瞭","/ja/stages/ISW-NO_明瞭/__data.json","/zh/stages/ISW-NO_地有四难","/zh/stages/ISW-NO_地有四难/__data.json","/en/stages/ISW-NO_The_Four_Difficulties","/en/stages/ISW-NO_The_Four_Difficulties/__data.json","/ja/stages/ISW-NO_地に四難有り","/ja/stages/ISW-NO_地に四難有り/__data.json","/zh/stages/ISW-NO_地有四难_b","/zh/stages/ISW-NO_地有四难_b/__data.json","/en/stages/ISW-NO_The_Four_Difficulties_b","/en/stages/ISW-NO_The_Four_Difficulties_b/__data.json","/ja/stages/ISW-NO_地に四難有り_b","/ja/stages/ISW-NO_地に四難有り_b/__data.json","/zh/stages/ISW-NO_凭器_a","/zh/stages/ISW-NO_凭器_a/__data.json","/en/stages/ISW-NO_Ware-User_a","/en/stages/ISW-NO_Ware-User_a/__data.json","/ja/stages/ISW-NO_器頼み_a","/ja/stages/ISW-NO_器頼み_a/__data.json","/zh/stages/ISW-NO_凭器_b","/zh/stages/ISW-NO_凭器_b/__data.json","/en/stages/ISW-NO_Ware-User_b","/en/stages/ISW-NO_Ware-User_b/__data.json","/ja/stages/ISW-NO_器頼み_b","/ja/stages/ISW-NO_器頼み_b/__data.json","/zh/stages/ISW-NO_凭器_c","/zh/stages/ISW-NO_凭器_c/__data.json","/en/stages/ISW-NO_Ware-User_c","/en/stages/ISW-NO_Ware-User_c/__data.json","/ja/stages/ISW-NO_器頼み_c","/ja/stages/ISW-NO_器頼み_c/__data.json","/zh/stages/ISW-NO_忘形","/zh/stages/ISW-NO_忘形/__data.json","/en/stages/ISW-NO_To_Forget_Oneself","/en/stages/ISW-NO_To_Forget_Oneself/__data.json","/ja/stages/ISW-NO_我を忘れる","/ja/stages/ISW-NO_我を忘れる/__data.json","/zh/stages/ISW-NO_忘形_b","/zh/stages/ISW-NO_忘形_b/__data.json","/en/stages/ISW-NO_To_Forget_Oneself_b","/en/stages/ISW-NO_To_Forget_Oneself_b/__data.json","/ja/stages/ISW-NO_我を忘れる_b","/ja/stages/ISW-NO_我を忘れる_b/__data.json","/zh/stages/ISW-NO_贪妄","/zh/stages/ISW-NO_贪妄/__data.json","/en/stages/ISW-NO_Avarice","/en/stages/ISW-NO_Avarice/__data.json","/ja/stages/ISW-NO_貪欲にして妄執","/ja/stages/ISW-NO_貪欲にして妄執/__data.json","/zh/stages/ISW-NO_奇谭","/zh/stages/ISW-NO_奇谭/__data.json","/en/stages/ISW-NO_Strange_Tales","/en/stages/ISW-NO_Strange_Tales/__data.json","/ja/stages/ISW-NO_奇譚","/ja/stages/ISW-NO_奇譚/__data.json","/zh/stages/ISW-NO_奇谭_b","/zh/stages/ISW-NO_奇谭_b/__data.json","/en/stages/ISW-NO_Strange_Tales_b","/en/stages/ISW-NO_Strange_Tales_b/__data.json","/ja/stages/ISW-NO_奇譚_b","/ja/stages/ISW-NO_奇譚_b/__data.json","/zh/stages/ISW-NO_破局","/zh/stages/ISW-NO_破局/__data.json","/en/stages/ISW-NO_Breakthrough","/en/stages/ISW-NO_Breakthrough/__data.json","/ja/stages/ISW-NO_局面打破","/ja/stages/ISW-NO_局面打破/__data.json","/zh/stages/ISW-NO_破局_b","/zh/stages/ISW-NO_破局_b/__data.json","/en/stages/ISW-NO_Breakthrough_b","/en/stages/ISW-NO_Breakthrough_b/__data.json","/ja/stages/ISW-NO_局面打破_b","/ja/stages/ISW-NO_局面打破_b/__data.json","/zh/stages/ISW-NO_不鉴","/zh/stages/ISW-NO_不鉴/__data.json","/en/stages/ISW-NO_Unreflecting","/en/stages/ISW-NO_Unreflecting/__data.json","/ja/stages/ISW-NO_教訓とせず","/ja/stages/ISW-NO_教訓とせず/__data.json","/zh/stages/ISW-NO_不鉴_b","/zh/stages/ISW-NO_不鉴_b/__data.json","/en/stages/ISW-NO_Unreflecting_b","/en/stages/ISW-NO_Unreflecting_b/__data.json","/ja/stages/ISW-NO_教訓とせず_b","/ja/stages/ISW-NO_教訓とせず_b/__data.json","/zh/stages/ISW-NO_靡靡之音","/zh/stages/ISW-NO_靡靡之音/__data.json","/en/stages/ISW-NO_Frivolous_Tunes","/en/stages/ISW-NO_Frivolous_Tunes/__data.json","/ja/stages/ISW-NO_退廃の音","/ja/stages/ISW-NO_退廃の音/__data.json","/zh/stages/ISW-NO_靡靡之音_b","/zh/stages/ISW-NO_靡靡之音_b/__data.json","/en/stages/ISW-NO_Frivolous_Tunes_b","/en/stages/ISW-NO_Frivolous_Tunes_b/__data.json","/ja/stages/ISW-NO_退廃の音_b","/ja/stages/ISW-NO_退廃の音_b/__data.json","/zh/stages/ISW-NO_愠怒_a","/zh/stages/ISW-NO_愠怒_a/__data.json","/en/stages/ISW-NO_Inner_Rage_a","/en/stages/ISW-NO_Inner_Rage_a/__data.json","/ja/stages/ISW-NO_憤怒_a","/ja/stages/ISW-NO_憤怒_a/__data.json","/zh/stages/ISW-NO_愠怒_b","/zh/stages/ISW-NO_愠怒_b/__data.json","/en/stages/ISW-NO_Inner_Rage_b","/en/stages/ISW-NO_Inner_Rage_b/__data.json","/ja/stages/ISW-NO_憤怒_b","/ja/stages/ISW-NO_憤怒_b/__data.json","/zh/stages/ISW-NO_愠怒_c","/zh/stages/ISW-NO_愠怒_c/__data.json","/en/stages/ISW-NO_Inner_Rage_c","/en/stages/ISW-NO_Inner_Rage_c/__data.json","/ja/stages/ISW-NO_憤怒_c","/ja/stages/ISW-NO_憤怒_c/__data.json","/zh/stages/ISW-NO_迷惘","/zh/stages/ISW-NO_迷惘/__data.json","/en/stages/ISW-NO_Confusion","/en/stages/ISW-NO_Confusion/__data.json","/ja/stages/ISW-NO_迷い","/ja/stages/ISW-NO_迷い/__data.json","/zh/stages/ISW-NO_迷惘_b","/zh/stages/ISW-NO_迷惘_b/__data.json","/en/stages/ISW-NO_Confusion_b","/en/stages/ISW-NO_Confusion_b/__data.json","/ja/stages/ISW-NO_迷い_b","/ja/stages/ISW-NO_迷い_b/__data.json","/ja/stages/ISW-NO_震坎","/ja/stages/ISW-NO_震坎/__data.json","/en/stages/ISW-NO_Difficult_Beginnings","/en/stages/ISW-NO_Difficult_Beginnings/__data.json","/ja/stages/ISW-NO_四方","/ja/stages/ISW-NO_四方/__data.json","/en/stages/ISW-NO_Everywhere","/en/stages/ISW-NO_Everywhere/__data.json","/zh/stages/ISW-NO_时封","/zh/stages/ISW-NO_时封/__data.json","/en/stages/ISW-NO_Sealed_Time","/en/stages/ISW-NO_Sealed_Time/__data.json","/ja/stages/ISW-NO_時の封","/ja/stages/ISW-NO_時の封/__data.json","/zh/stages/ISW-NO_遍地福音","/zh/stages/ISW-NO_遍地福音/__data.json","/en/stages/ISW-NO_Omnipresent_Gospel","/en/stages/ISW-NO_Omnipresent_Gospel/__data.json","/ja/stages/ISW-NO_満ちる福音","/ja/stages/ISW-NO_満ちる福音/__data.json","/ja/stages/ISW-NO_相合","/ja/stages/ISW-NO_相合/__data.json","/en/stages/ISW-NO_Conformity","/en/stages/ISW-NO_Conformity/__data.json","/zh/stages/ISW-NO_地有四难_dlc1","/zh/stages/ISW-NO_地有四难_dlc1/__data.json","/en/stages/ISW-NO_The_Four_Difficulties_dlc1","/en/stages/ISW-NO_The_Four_Difficulties_dlc1/__data.json","/ja/stages/ISW-NO_地に四難有り_dlc1","/ja/stages/ISW-NO_地に四難有り_dlc1/__data.json","/zh/stages/ISW-NO_地有四难_b_dlc1","/zh/stages/ISW-NO_地有四难_b_dlc1/__data.json","/en/stages/ISW-NO_The_Four_Difficulties_b_dlc1","/en/stages/ISW-NO_The_Four_Difficulties_b_dlc1/__data.json","/ja/stages/ISW-NO_地に四難有り_b_dlc1","/ja/stages/ISW-NO_地に四難有り_b_dlc1/__data.json","/zh/stages/ISW-NO_忘形_dlc1","/zh/stages/ISW-NO_忘形_dlc1/__data.json","/en/stages/ISW-NO_To_Forget_Oneself_dlc1","/en/stages/ISW-NO_To_Forget_Oneself_dlc1/__data.json","/ja/stages/ISW-NO_我を忘れる_dlc1","/ja/stages/ISW-NO_我を忘れる_dlc1/__data.json","/zh/stages/ISW-NO_忘形_b_dlc1","/zh/stages/ISW-NO_忘形_b_dlc1/__data.json","/en/stages/ISW-NO_To_Forget_Oneself_b_dlc1","/en/stages/ISW-NO_To_Forget_Oneself_b_dlc1/__data.json","/ja/stages/ISW-NO_我を忘れる_b_dlc1","/ja/stages/ISW-NO_我を忘れる_b_dlc1/__data.json","/zh/stages/ISW-NO_贪妄_dlc1","/zh/stages/ISW-NO_贪妄_dlc1/__data.json","/en/stages/ISW-NO_Avarice_dlc1","/en/stages/ISW-NO_Avarice_dlc1/__data.json","/ja/stages/ISW-NO_貪欲にして妄執_dlc1","/ja/stages/ISW-NO_貪欲にして妄執_dlc1/__data.json","/zh/stages/ISW-NO_奇谭_dlc1","/zh/stages/ISW-NO_奇谭_dlc1/__data.json","/en/stages/ISW-NO_Strange_Tales_dlc1","/en/stages/ISW-NO_Strange_Tales_dlc1/__data.json","/ja/stages/ISW-NO_奇譚_dlc1","/ja/stages/ISW-NO_奇譚_dlc1/__data.json","/zh/stages/ISW-NO_奇谭_b_dlc1","/zh/stages/ISW-NO_奇谭_b_dlc1/__data.json","/en/stages/ISW-NO_Strange_Tales_b_dlc1","/en/stages/ISW-NO_Strange_Tales_b_dlc1/__data.json","/ja/stages/ISW-NO_奇譚_b_dlc1","/ja/stages/ISW-NO_奇譚_b_dlc1/__data.json","/zh/stages/ISW-NO_破局_dlc1","/zh/stages/ISW-NO_破局_dlc1/__data.json","/en/stages/ISW-NO_Breakthrough_dlc1","/en/stages/ISW-NO_Breakthrough_dlc1/__data.json","/ja/stages/ISW-NO_局面打破_dlc1","/ja/stages/ISW-NO_局面打破_dlc1/__data.json","/zh/stages/ISW-NO_破局_b_dlc1","/zh/stages/ISW-NO_破局_b_dlc1/__data.json","/en/stages/ISW-NO_Breakthrough_b_dlc1","/en/stages/ISW-NO_Breakthrough_b_dlc1/__data.json","/ja/stages/ISW-NO_局面打破_b_dlc1","/ja/stages/ISW-NO_局面打破_b_dlc1/__data.json","/zh/stages/ISW-NO_不鉴_dlc1","/zh/stages/ISW-NO_不鉴_dlc1/__data.json","/en/stages/ISW-NO_Unreflecting_dlc1","/en/stages/ISW-NO_Unreflecting_dlc1/__data.json","/ja/stages/ISW-NO_教訓とせず_dlc1","/ja/stages/ISW-NO_教訓とせず_dlc1/__data.json","/zh/stages/ISW-NO_不鉴_b_dlc1","/zh/stages/ISW-NO_不鉴_b_dlc1/__data.json","/en/stages/ISW-NO_Unreflecting_b_dlc1","/en/stages/ISW-NO_Unreflecting_b_dlc1/__data.json","/ja/stages/ISW-NO_教訓とせず_b_dlc1","/ja/stages/ISW-NO_教訓とせず_b_dlc1/__data.json","/zh/stages/ISW-NO_靡靡之音_dlc1","/zh/stages/ISW-NO_靡靡之音_dlc1/__data.json","/en/stages/ISW-NO_Frivolous_Tunes_dlc1","/en/stages/ISW-NO_Frivolous_Tunes_dlc1/__data.json","/ja/stages/ISW-NO_退廃の音_dlc1","/ja/stages/ISW-NO_退廃の音_dlc1/__data.json","/zh/stages/ISW-NO_靡靡之音_b_dlc1","/zh/stages/ISW-NO_靡靡之音_b_dlc1/__data.json","/en/stages/ISW-NO_Frivolous_Tunes_b_dlc1","/en/stages/ISW-NO_Frivolous_Tunes_b_dlc1/__data.json","/ja/stages/ISW-NO_退廃の音_b_dlc1","/ja/stages/ISW-NO_退廃の音_b_dlc1/__data.json","/zh/stages/ISW-NO_愠怒_dlc1","/zh/stages/ISW-NO_愠怒_dlc1/__data.json","/en/stages/ISW-NO_Inner_Rage_dlc1","/en/stages/ISW-NO_Inner_Rage_dlc1/__data.json","/ja/stages/ISW-NO_憤怒_dlc1","/ja/stages/ISW-NO_憤怒_dlc1/__data.json","/zh/stages/ISW-NO_迷惘_dlc1","/zh/stages/ISW-NO_迷惘_dlc1/__data.json","/en/stages/ISW-NO_Confusion_dlc1","/en/stages/ISW-NO_Confusion_dlc1/__data.json","/ja/stages/ISW-NO_迷い_dlc1","/ja/stages/ISW-NO_迷い_dlc1/__data.json","/zh/stages/ISW-NO_迷惘_b_dlc1","/zh/stages/ISW-NO_迷惘_b_dlc1/__data.json","/en/stages/ISW-NO_Confusion_b_dlc1","/en/stages/ISW-NO_Confusion_b_dlc1/__data.json","/ja/stages/ISW-NO_迷い_b_dlc1","/ja/stages/ISW-NO_迷い_b_dlc1/__data.json","/zh/stages/ISW-NO_狡鼷三窟","/zh/stages/ISW-NO_狡鼷三窟/__data.json","/en/stages/ISW-NO_Whack-A-Mus","/en/stages/ISW-NO_Whack-A-Mus/__data.json","/ja/stages/ISW-NO_鼷獣の巣穴","/ja/stages/ISW-NO_鼷獣の巣穴/__data.json","/zh/stages/ISW-NO_赶集","/zh/stages/ISW-NO_赶集/__data.json","/en/stages/ISW-NO_To_Market","/en/stages/ISW-NO_To_Market/__data.json","/ja/stages/ISW-NO_露店市場へ","/ja/stages/ISW-NO_露店市場へ/__data.json","/zh/stages/ISW-NO_正经生意","/zh/stages/ISW-NO_正经生意/__data.json","/en/stages/ISW-NO_Serious_Business","/en/stages/ISW-NO_Serious_Business/__data.json","/ja/stages/ISW-NO_まともな商売","/ja/stages/ISW-NO_まともな商売/__data.json","/zh/stages/ISW-NO_老戏骨","/zh/stages/ISW-NO_老戏骨/__data.json","/en/stages/ISW-NO_Veteran_Actor","/en/stages/ISW-NO_Veteran_Actor/__data.json","/ja/stages/ISW-NO_老練の役者","/ja/stages/ISW-NO_老練の役者/__data.json","/zh/stages/ISW-NO_驱虫","/zh/stages/ISW-NO_驱虫/__data.json","/en/stages/ISW-NO_Pest_Control","/en/stages/ISW-NO_Pest_Control/__data.json","/ja/stages/ISW-NO_害虫駆除","/ja/stages/ISW-NO_害虫駆除/__data.json","/zh/stages/ISW-NO_凭票入内","/zh/stages/ISW-NO_凭票入内/__data.json","/en/stages/ISW-NO_Ticket_Please","/en/stages/ISW-NO_Ticket_Please/__data.json","/ja/stages/ISW-NO_入園受付","/ja/stages/ISW-NO_入園受付/__data.json","/zh/stages/ISW-NO_有教无类","/zh/stages/ISW-NO_有教无类/__data.json","/en/stages/ISW-NO_Learning_for_All","/en/stages/ISW-NO_Learning_for_All/__data.json","/ja/stages/ISW-NO_教え有りて類無し","/ja/stages/ISW-NO_教え有りて類無し/__data.json","/zh/stages/ISW-NO_飞来横祸","/zh/stages/ISW-NO_飞来横祸/__data.json","/en/stages/ISW-NO_Look_Out_Above","/en/stages/ISW-NO_Look_Out_Above/__data.json","/ja/stages/ISW-NO_飛来する災い","/ja/stages/ISW-NO_飛来する災い/__data.json","/zh/stages/ISW-NO_所守者，义","/zh/stages/ISW-NO_所守者，义/__data.json","/en/stages/ISW-NO_Guardian_of_Justice","/en/stages/ISW-NO_Guardian_of_Justice/__data.json","/ja/stages/ISW-NO_守りしものは義なり","/ja/stages/ISW-NO_守りしものは義なり/__data.json","/zh/stages/ISW-NO_明抢暗偷","/zh/stages/ISW-NO_明抢暗偷/__data.json","/en/stages/ISW-NO_Daylight_Robbery","/en/stages/ISW-NO_Daylight_Robbery/__data.json","/ja/stages/ISW-NO_強盗と泥棒","/ja/stages/ISW-NO_強盗と泥棒/__data.json","/zh/stages/ISW-NO_救援行动","/zh/stages/ISW-NO_救援行动/__data.json","/en/stages/ISW-NO_Rescue_Mission","/en/stages/ISW-NO_Rescue_Mission/__data.json","/ja/stages/ISW-NO_救助活動","/ja/stages/ISW-NO_救助活動/__data.json","/zh/stages/ISW-NO_玩具兵将","/zh/stages/ISW-NO_玩具兵将/__data.json","/en/stages/ISW-NO_Toy_Soldiers","/en/stages/ISW-NO_Toy_Soldiers/__data.json","/ja/stages/ISW-NO_おもちゃの将兵","/ja/stages/ISW-NO_おもちゃの将兵/__data.json","/zh/stages/ISW-NO_啖之以利","/zh/stages/ISW-NO_啖之以利/__data.json","/en/stages/ISW-NO_Hook,_Line,_and_Sinker","/en/stages/ISW-NO_Hook,_Line,_and_Sinker/__data.json","/ja/stages/ISW-NO_甘い誘い","/ja/stages/ISW-NO_甘い誘い/__data.json","/zh/stages/ISW-NO_长驱不复","/zh/stages/ISW-NO_长驱不复/__data.json","/en/stages/ISW-NO_Stopping_the_Advance","/en/stages/ISW-NO_Stopping_the_Advance/__data.json","/ja/stages/ISW-NO_ひたすらな前進","/ja/stages/ISW-NO_ひたすらな前進/__data.json","/zh/stages/ISW-NO_背山面水","/zh/stages/ISW-NO_背山面水/__data.json","/en/stages/ISW-NO_Feng_Shui","/en/stages/ISW-NO_Feng_Shui/__data.json","/ja/stages/ISW-NO_後方に山、前方に水","/ja/stages/ISW-NO_後方に山、前方に水/__data.json","/zh/stages/ISW-NO_去晦","/zh/stages/ISW-NO_去晦/__data.json","/en/stages/ISW-NO_Away,_Hui!","/en/stages/ISW-NO_Away,_Hui!/__data.json","/ja/stages/ISW-NO_邪気払い","/ja/stages/ISW-NO_邪気払い/__data.json","/zh/stages/ISW-NO_落叶归根","/zh/stages/ISW-NO_落叶归根/__data.json","/en/stages/ISW-NO_Return_to_Your_Roots","/en/stages/ISW-NO_Return_to_Your_Roots/__data.json","/ja/stages/ISW-NO_落葉の帰る場所","/ja/stages/ISW-NO_落葉の帰る場所/__data.json","/zh/stages/ISW-NO_御外侮","/zh/stages/ISW-NO_御外侮/__data.json","/en/stages/ISW-NO_Repel_the_Outsiders","/en/stages/ISW-NO_Repel_the_Outsiders/__data.json","/ja/stages/ISW-NO_外侮を禦ぐ","/ja/stages/ISW-NO_外侮を禦ぐ/__data.json","/zh/stages/ISW-NO_山海必争","/zh/stages/ISW-NO_山海必争/__data.json","/en/stages/ISW-NO_Shanhaizhong_Scramble","/en/stages/ISW-NO_Shanhaizhong_Scramble/__data.json","/ja/stages/ISW-NO_山海の争い","/ja/stages/ISW-NO_山海の争い/__data.json","/zh/stages/ISW-NO_贪饵","/zh/stages/ISW-NO_贪饵/__data.json","/en/stages/ISW-NO_Sugared_Bait","/en/stages/ISW-NO_Sugared_Bait/__data.json","/ja/stages/ISW-NO_食い意地","/ja/stages/ISW-NO_食い意地/__data.json","/zh/stages/ISW-NO_识文","/zh/stages/ISW-NO_识文/__data.json","/en/stages/ISW-NO_Cultured","/en/stages/ISW-NO_Cultured/__data.json","/ja/stages/ISW-NO_文字を知る","/ja/stages/ISW-NO_文字を知る/__data.json","/zh/stages/ISW-NO_赶场戏班","/zh/stages/ISW-NO_赶场戏班/__data.json","/en/stages/ISW-NO_Take_the_Stage","/en/stages/ISW-NO_Take_the_Stage/__data.json","/ja/stages/ISW-NO_舞台への出演","/ja/stages/ISW-NO_舞台への出演/__data.json","/zh/stages/ISW-NO_峥嵘战功","/zh/stages/ISW-NO_峥嵘战功/__data.json","/en/stages/ISW-NO_Exemplary_Service","/en/stages/ISW-NO_Exemplary_Service/__data.json","/ja/stages/ISW-NO_輝かしい戦功","/ja/stages/ISW-NO_輝かしい戦功/__data.json","/zh/stages/ISW-NO_暗箭难防","/zh/stages/ISW-NO_暗箭难防/__data.json","/en/stages/ISW-NO_Beware_the_Shadows","/en/stages/ISW-NO_Beware_the_Shadows/__data.json","/ja/stages/ISW-NO_闇討ちは防ぎ難し","/ja/stages/ISW-NO_闇討ちは防ぎ難し/__data.json","/zh/stages/ISW-NO_忍气不吞声","/zh/stages/ISW-NO_忍气不吞声/__data.json","/en/stages/ISW-NO_Let_It_All_Out","/en/stages/ISW-NO_Let_It_All_Out/__data.json","/ja/stages/ISW-NO_忍べど黙せず","/ja/stages/ISW-NO_忍べど黙せず/__data.json","/zh/stages/ISW-NO_青山不语","/zh/stages/ISW-NO_青山不语/__data.json","/en/stages/ISW-NO_Green_Hills_Speak_Not","/en/stages/ISW-NO_Green_Hills_Speak_Not/__data.json","/ja/stages/ISW-NO_青嶺は語らず","/ja/stages/ISW-NO_青嶺は語らず/__data.json","/zh/stages/ISW-NO_离域检查","/zh/stages/ISW-NO_离域检查/__data.json","/en/stages/ISW-NO_Departing_Inspection","/en/stages/ISW-NO_Departing_Inspection/__data.json","/ja/stages/ISW-NO_退場検査","/ja/stages/ISW-NO_退場検査/__data.json","/zh/stages/ISW-NO_薄礼一份","/zh/stages/ISW-NO_薄礼一份/__data.json","/en/stages/ISW-NO_A_Humble_Gift","/en/stages/ISW-NO_A_Humble_Gift/__data.json","/ja/stages/ISW-NO_ささやかな謝礼","/ja/stages/ISW-NO_ささやかな謝礼/__data.json","/zh/stages/ISW-NO_往事喑哑","/zh/stages/ISW-NO_往事喑哑/__data.json","/en/stages/ISW-NO_Muted_Past","/en/stages/ISW-NO_Muted_Past/__data.json","/ja/stages/ISW-NO_過去の沈黙","/ja/stages/ISW-NO_過去の沈黙/__data.json","/zh/stages/ISW-NO_邙山镇地方志","/zh/stages/ISW-NO_邙山镇地方志/__data.json","/en/stages/ISW-NO_Mangshan_Town_Records","/en/stages/ISW-NO_Mangshan_Town_Records/__data.json","/ja/stages/ISW-NO_邙山町郷土誌","/ja/stages/ISW-NO_邙山町郷土誌/__data.json","/zh/stages/ISW-NO_不成烟火","/zh/stages/ISW-NO_不成烟火/__data.json","/en/stages/ISW-NO_Unlit_Sparks","/en/stages/ISW-NO_Unlit_Sparks/__data.json","/ja/stages/ISW-NO_煙火に成らず","/ja/stages/ISW-NO_煙火に成らず/__data.json","/zh/stages/ISW-NO_砺锋","/zh/stages/ISW-NO_砺锋/__data.json","/en/stages/ISW-NO_Honed_Edge","/en/stages/ISW-NO_Honed_Edge/__data.json","/ja/stages/ISW-NO_研がれた切先","/ja/stages/ISW-NO_研がれた切先/__data.json","/zh/stages/ISW-NO_炎灼","/zh/stages/ISW-NO_炎灼/__data.json","/en/stages/ISW-NO_Inferno","/en/stages/ISW-NO_Inferno/__data.json","/ja/stages/ISW-NO_灼熱の炎","/ja/stages/ISW-NO_灼熱の炎/__data.json","/zh/stages/ISW-NO_人镇","/zh/stages/ISW-NO_人镇/__data.json","/en/stages/ISW-NO_Garrison","/en/stages/ISW-NO_Garrison/__data.json","/ja/stages/ISW-NO_人により鎮める","/ja/stages/ISW-NO_人により鎮める/__data.json","/zh/stages/ISW-NO_越山海","/zh/stages/ISW-NO_越山海/__data.json","/en/stages/ISW-NO_Beyond_Mount_and_Sea","/en/stages/ISW-NO_Beyond_Mount_and_Sea/__data.json","/ja/stages/ISW-NO_山海を越える","/ja/stages/ISW-NO_山海を越える/__data.json","/zh/stages/ISW-NO_借力打力","/zh/stages/ISW-NO_借力打力/__data.json","/en/stages/ISW-NO_Force_Redirection","/en/stages/ISW-NO_Force_Redirection/__data.json","/ja/stages/ISW-NO_力を借りて力を打つ","/ja/stages/ISW-NO_力を借りて力を打つ/__data.json","/zh/stages/ISW-NO_铁腕迷思","/zh/stages/ISW-NO_铁腕迷思/__data.json","/zh/stages/ISW-NO_哀悼铁腕","/zh/stages/ISW-NO_哀悼铁腕/__data.json","/zh/stages/ISW-NO_光荣远征","/zh/stages/ISW-NO_光荣远征/__data.json","/zh/stages/ISW-NO_赤金厄运","/zh/stages/ISW-NO_赤金厄运/__data.json","/zh/stages/ISW-NO_狂热敬虔","/zh/stages/ISW-NO_狂热敬虔/__data.json","/zh/stages/ISW-NO_冰冷流亡","/zh/stages/ISW-NO_冰冷流亡/__data.json","/zh/stages/ISW-DF_永无安宁","/zh/stages/ISW-DF_永无安宁/__data.json","/zh/stages/ISW-DF_痛苦将息","/zh/stages/ISW-DF_痛苦将息/__data.json","/zh/stages/ISW-DF_混沌源阶理论","/zh/stages/ISW-DF_混沌源阶理论/__data.json","/zh/stages/ISW-DF_畸症","/zh/stages/ISW-DF_畸症/__data.json","/zh/stages/ISW-NO_陌生旅伴","/zh/stages/ISW-NO_陌生旅伴/__data.json","/zh/stages/ISW-NO_安保措施","/zh/stages/ISW-NO_安保措施/__data.json","/zh/stages/ISW-NO_开业剪彩","/zh/stages/ISW-NO_开业剪彩/__data.json","/zh/stages/ISW-NO_合伙人会议","/zh/stages/ISW-NO_合伙人会议/__data.json","/zh/stages/ISW-NO_湖中魇","/zh/stages/ISW-NO_湖中魇/__data.json","/zh/stages/ISW-NO_死箱","/zh/stages/ISW-NO_死箱/__data.json","/zh/stages/ISW-NO_活木","/zh/stages/ISW-NO_活木/__data.json","/zh/stages/ISW-NO_强买强卖","/zh/stages/ISW-NO_强买强卖/__data.json","/zh/stages/ISW-NO_进退趋同","/zh/stages/ISW-NO_进退趋同/__data.json","/zh/stages/ISW-NO_枯枝","/zh/stages/ISW-NO_枯枝/__data.json","/zh/stages/ISW-NO_败叶","/zh/stages/ISW-NO_败叶/__data.json","/zh/stages/ISW-NO_无效验尸","/zh/stages/ISW-NO_无效验尸/__data.json","/zh/stages/ISW-NO_“闹乐”","/zh/stages/ISW-NO_“闹乐”/__data.json","/zh/stages/ISW-NO_“纵怒”","/zh/stages/ISW-NO_“纵怒”/__data.json","/zh/stages/ISW-NO_“灭身”","/zh/stages/ISW-NO_“灭身”/__data.json","/zh/stages/ISW-NO_搏杀","/zh/stages/ISW-NO_搏杀/__data.json","/zh/stages/ISW-NO_共斗","/zh/stages/ISW-NO_共斗/__data.json","/zh/stages/ISW-NO_血夜回魂","/zh/stages/ISW-NO_血夜回魂/__data.json","/zh/stages/ISW-NO_毛绒游戏","/zh/stages/ISW-NO_毛绒游戏/__data.json","/zh/stages/ISW-NO_在劫难逃","/zh/stages/ISW-NO_在劫难逃/__data.json","/zh/stages/ISW-NO_咩的朋友","/zh/stages/ISW-NO_咩的朋友/__data.json","/zh/stages/ISW-NO_外显尖牙","/zh/stages/ISW-NO_外显尖牙/__data.json","/zh/stages/ISW-NO_一视同仁","/zh/stages/ISW-NO_一视同仁/__data.json","/zh/stages/ISW-NO_猎犬病原","/zh/stages/ISW-NO_猎犬病原/__data.json","/zh/stages/ISW-NO_遗忘时间","/zh/stages/ISW-NO_遗忘时间/__data.json","/zh/stages/ISW-NO_急不可耐","/zh/stages/ISW-NO_急不可耐/__data.json","/zh/stages/ISW-NO_灌水贤者","/zh/stages/ISW-NO_灌水贤者/__data.json","/zh/stages/ISW-NO_虫虫游戏厅","/zh/stages/ISW-NO_虫虫游戏厅/__data.json","/zh/stages/ISW-NO_无主地","/zh/stages/ISW-NO_无主地/__data.json","/zh/stages/ISW-NO_本性难移","/zh/stages/ISW-NO_本性难移/__data.json","/zh/stages/ISW-NO_远北猎场","/zh/stages/ISW-NO_远北猎场/__data.json","/zh/stages/ISW-NO_枝头陷阱","/zh/stages/ISW-NO_枝头陷阱/__data.json","/zh/stages/ISW-NO_预算否决","/zh/stages/ISW-NO_预算否决/__data.json","/zh/stages/ISW-NO_生存习性","/zh/stages/ISW-NO_生存习性/__data.json","/zh/stages/ISW-NO_辟路行进","/zh/stages/ISW-NO_辟路行进/__data.json","/zh/stages/ISW-NO_趁火打劫","/zh/stages/ISW-NO_趁火打劫/__data.json","/zh/stages/ISW-NO_焦土之家","/zh/stages/ISW-NO_焦土之家/__data.json","/zh/stages/ISW-NO_黑色逆流","/zh/stages/ISW-NO_黑色逆流/__data.json","/zh/stages/ISW-NO_未来见闻","/zh/stages/ISW-NO_未来见闻/__data.json","/zh/stages/ISW-NO_种植园惊魂","/zh/stages/ISW-NO_种植园惊魂/__data.json","/zh/stages/ISW-NO_选边站","/zh/stages/ISW-NO_选边站/__data.json","/zh/stages/ISW-NO_诞生礼","/zh/stages/ISW-NO_诞生礼/__data.json","/zh/stages/ISW-NO_暴力押运","/zh/stages/ISW-NO_暴力押运/__data.json","/zh/stages/ISW-NO_长刀寒夜","/zh/stages/ISW-NO_长刀寒夜/__data.json","/zh/stages/ISW-NO_侵占家园","/zh/stages/ISW-NO_侵占家园/__data.json","/zh/stages/ISW-NO_一步之遥","/zh/stages/ISW-NO_一步之遥/__data.json","/zh/stages/ISW-NO_物欲遮天","/zh/stages/ISW-NO_物欲遮天/__data.json","/zh/stages/ISW-NO_恶意讨薪","/zh/stages/ISW-NO_恶意讨薪/__data.json","/zh/stages/ISW-NO_送别仪式","/zh/stages/ISW-NO_送别仪式/__data.json","/zh/stages/ISW-NO_彼处水如酒","/zh/stages/ISW-NO_彼处水如酒/__data.json","/zh/stages/ISW-NO_丛林法则","/zh/stages/ISW-NO_丛林法则/__data.json","/zh/stages/ISW-NO_过度繁殖","/zh/stages/ISW-NO_过度繁殖/__data.json","/zh/stages/ISW-NO_命运共享","/zh/stages/ISW-NO_命运共享/__data.json","/zh/stages/ISW-NO_同域共存","/zh/stages/ISW-NO_同域共存/__data.json","/zh/stages/ISW-NO_木本玉米","/zh/stages/ISW-NO_木本玉米/__data.json","/zh/stages/ISW-NO_圆石技艺","/zh/stages/ISW-NO_圆石技艺/__data.json","/zh/stages/ISW-NO_取景胜地","/zh/stages/ISW-NO_取景胜地/__data.json","/zh/stages/ISW-NO_安魂节起义","/zh/stages/ISW-NO_安魂节起义/__data.json","/zh/stages/ISW-NO_灵魂归宿","/zh/stages/ISW-NO_灵魂归宿/__data.json","/zh/stages/ISW-NO_刺生灾害","/zh/stages/ISW-NO_刺生灾害/__data.json","/zh/stages/ISW-NO_贫瘠行军","/zh/stages/ISW-NO_贫瘠行军/__data.json","/zh/stages/ISW-NO_不解之缘","/zh/stages/ISW-NO_不解之缘/__data.json","/zh/stages/ISW-DF_失恒常量","/zh/stages/ISW-DF_失恒常量/__data.json","/zh/stages/ISW-DF_熄日_b","/zh/stages/ISW-DF_熄日_b/__data.json","/zh/stages/ISW-DF_熄日","/zh/stages/ISW-DF_熄日/__data.json","/zh/stages/ISW-NO_易燃隐患","/zh/stages/ISW-NO_易燃隐患/__data.json","/zh/stages/ISW-NO_晶矿惊蝗","/zh/stages/ISW-NO_晶矿惊蝗/__data.json","/zh/stages/ISW-NO_灰坑","/zh/stages/ISW-NO_灰坑/__data.json","/sitemap.xml","/en","/ja","/zh","/zh/stages/ISW-NO_共生","/zh/stages/ISW-NO_共生/__data.json","/zh/stages/ISW-NO_育生池","/zh/stages/ISW-NO_育生池/__data.json","/zh/stages/ISW-NO_蔓延","/zh/stages/ISW-NO_蔓延/__data.json","/zh/stages/ISW-SP_真相","/zh/stages/ISW-SP_真相/__data.json","/zh/stages/ISW-NO_感化","/zh/stages/ISW-NO_感化/__data.json","/zh/stages/ISW-NO_公害","/zh/stages/ISW-NO_公害/__data.json","/zh/stages/ISW-NO_神出鬼没","/zh/stages/ISW-NO_神出鬼没/__data.json","/zh/stages/ISW-NO_混沌","/zh/stages/ISW-NO_混沌/__data.json","/zh/stages/ISW-NO_洞天福地","/zh/stages/ISW-NO_洞天福地/__data.json","/zh/stages/ISW-NO_呼吸","/zh/stages/ISW-NO_呼吸/__data.json","/zh/stages/ISW-NO_求道","/zh/stages/ISW-NO_求道/__data.json","/zh/stages/ISW-DF_末狩","/zh/stages/ISW-DF_末狩/__data.json","/zh/stages/ISW-NO_迎雷(双)","/zh/stages/ISW-NO_迎雷(双)/__data.json","/zh/stages/ISW-NO_蔑震(双)","/zh/stages/ISW-NO_蔑震(双)/__data.json","/zh/stages/ISW-NO_斥洪(双)","/zh/stages/ISW-NO_斥洪(双)/__data.json","/zh/stages/ISW-NO_南武群英会","/zh/stages/ISW-NO_南武群英会/__data.json","/zh/stages/ISW-NO_震坎","/zh/stages/ISW-NO_震坎/__data.json","/zh/stages/ISW-NO_四方","/zh/stages/ISW-NO_四方/__data.json","/zh/stages/ISW-NO_相合","/zh/stages/ISW-NO_相合/__data.json","/ja/stages/ISW-DF_定乾坤","/ja/stages/ISW-DF_定乾坤/__data.json","/en/black","/en/sui","/ja/black","/ja/sui","/zh/black","/zh/sui","/en/stages/ISW-NO_猎犬病原","/en/stages/ISW-NO_猎犬病原/__data.json","/en/stages/ISW-NO_遗忘时间","/en/stages/ISW-NO_遗忘时间/__data.json","/en/stages/ISW-NO_急不可耐","/en/stages/ISW-NO_急不可耐/__data.json","/en/stages/ISW-NO_灌水贤者","/en/stages/ISW-NO_灌水贤者/__data.json","/en/stages/ISW-NO_虫虫游戏厅","/en/stages/ISW-NO_虫虫游戏厅/__data.json","/en/stages/ISW-NO_无主地","/en/stages/ISW-NO_无主地/__data.json","/en/stages/ISW-NO_本性难移","/en/stages/ISW-NO_本性难移/__data.json","/en/stages/ISW-NO_远北猎场","/en/stages/ISW-NO_远北猎场/__data.json","/en/stages/ISW-NO_枝头陷阱","/en/stages/ISW-NO_枝头陷阱/__data.json","/en/stages/ISW-NO_木本玉米","/en/stages/ISW-NO_木本玉米/__data.json","/en/stages/ISW-NO_预算否决","/en/stages/ISW-NO_预算否决/__data.json","/en/stages/ISW-NO_生存习性","/en/stages/ISW-NO_生存习性/__data.json","/en/stages/ISW-NO_辟路行进","/en/stages/ISW-NO_辟路行进/__data.json","/en/stages/ISW-NO_趁火打劫","/en/stages/ISW-NO_趁火打劫/__data.json","/en/stages/ISW-NO_焦土之家","/en/stages/ISW-NO_焦土之家/__data.json","/en/stages/ISW-NO_黑色逆流","/en/stages/ISW-NO_黑色逆流/__data.json","/en/stages/ISW-NO_圆石技艺","/en/stages/ISW-NO_圆石技艺/__data.json","/en/stages/ISW-NO_未来见闻","/en/stages/ISW-NO_未来见闻/__data.json","/en/stages/ISW-NO_种植园惊魂","/en/stages/ISW-NO_种植园惊魂/__data.json","/en/stages/ISW-NO_选边站","/en/stages/ISW-NO_选边站/__data.json","/en/stages/ISW-NO_诞生礼","/en/stages/ISW-NO_诞生礼/__data.json","/en/stages/ISW-NO_暴力押运","/en/stages/ISW-NO_暴力押运/__data.json","/en/stages/ISW-NO_长刀寒夜","/en/stages/ISW-NO_长刀寒夜/__data.json","/en/stages/ISW-NO_侵占家园","/en/stages/ISW-NO_侵占家园/__data.json","/en/stages/ISW-NO_取景胜地","/en/stages/ISW-NO_取景胜地/__data.json","/en/stages/ISW-NO_安魂节起义","/en/stages/ISW-NO_安魂节起义/__data.json","/en/stages/ISW-NO_一步之遥","/en/stages/ISW-NO_一步之遥/__data.json","/en/stages/ISW-NO_物欲遮天","/en/stages/ISW-NO_物欲遮天/__data.json","/en/stages/ISW-NO_恶意讨薪","/en/stages/ISW-NO_恶意讨薪/__data.json","/en/stages/ISW-NO_送别仪式","/en/stages/ISW-NO_送别仪式/__data.json","/en/stages/ISW-NO_彼处水如酒","/en/stages/ISW-NO_彼处水如酒/__data.json","/en/stages/ISW-NO_丛林法则","/en/stages/ISW-NO_丛林法则/__data.json","/en/stages/ISW-NO_过度繁殖","/en/stages/ISW-NO_过度繁殖/__data.json","/en/stages/ISW-NO_灵魂归宿","/en/stages/ISW-NO_灵魂归宿/__data.json","/en/stages/ISW-NO_刺生灾害","/en/stages/ISW-NO_刺生灾害/__data.json","/en/stages/ISW-NO_命运共享","/en/stages/ISW-NO_命运共享/__data.json","/en/stages/ISW-NO_同域共存","/en/stages/ISW-NO_同域共存/__data.json","/en/stages/ISW-NO_无效验尸","/en/stages/ISW-NO_无效验尸/__data.json","/en/stages/ISW-NO_贫瘠行军","/en/stages/ISW-NO_贫瘠行军/__data.json","/en/stages/ISW-NO_不解之缘","/en/stages/ISW-NO_不解之缘/__data.json","/en/stages/ISW-NO_铁腕迷思","/en/stages/ISW-NO_铁腕迷思/__data.json","/en/stages/ISW-NO_光荣远征","/en/stages/ISW-NO_光荣远征/__data.json","/en/stages/ISW-NO_狂热敬虔","/en/stages/ISW-NO_狂热敬虔/__data.json","/en/stages/ISW-NO_哀悼铁腕","/en/stages/ISW-NO_哀悼铁腕/__data.json","/en/stages/ISW-NO_赤金厄运","/en/stages/ISW-NO_赤金厄运/__data.json","/en/stages/ISW-NO_冰冷流亡","/en/stages/ISW-NO_冰冷流亡/__data.json","/en/stages/ISW-DF_永无安宁","/en/stages/ISW-DF_永无安宁/__data.json","/en/stages/ISW-DF_混沌源阶理论","/en/stages/ISW-DF_混沌源阶理论/__data.json","/en/stages/ISW-DF_痛苦将息","/en/stages/ISW-DF_痛苦将息/__data.json","/en/stages/ISW-DF_失恒常量","/en/stages/ISW-DF_失恒常量/__data.json","/en/stages/ISW-DF_畸症","/en/stages/ISW-DF_畸症/__data.json","/en/stages/ISW-DF_熄日","/en/stages/ISW-DF_熄日/__data.json","/en/stages/ISW-NO_血夜回魂","/en/stages/ISW-NO_血夜回魂/__data.json","/en/stages/ISW-NO_毛绒游戏","/en/stages/ISW-NO_毛绒游戏/__data.json","/en/stages/ISW-NO_在劫难逃","/en/stages/ISW-NO_在劫难逃/__data.json","/en/stages/ISW-NO_咩的朋友","/en/stages/ISW-NO_咩的朋友/__data.json","/en/stages/ISW-NO_外显尖牙","/en/stages/ISW-NO_外显尖牙/__data.json","/en/stages/ISW-NO_一视同仁","/en/stages/ISW-NO_一视同仁/__data.json","/en/stages/ISW-NO_易燃隐患","/en/stages/ISW-NO_易燃隐患/__data.json","/en/stages/ISW-NO_“闹乐”","/en/stages/ISW-NO_“闹乐”/__data.json","/en/stages/ISW-NO_“纵怒”","/en/stages/ISW-NO_“纵怒”/__data.json","/en/stages/ISW-NO_“灭身”","/en/stages/ISW-NO_“灭身”/__data.json","/en/stages/ISW-NO_晶矿惊蝗","/en/stages/ISW-NO_晶矿惊蝗/__data.json","/en/stages/ISW-NO_陌生旅伴","/en/stages/ISW-NO_陌生旅伴/__data.json","/en/stages/ISW-NO_安保措施","/en/stages/ISW-NO_安保措施/__data.json","/en/stages/ISW-NO_开业剪彩","/en/stages/ISW-NO_开业剪彩/__data.json","/en/stages/ISW-NO_合伙人会议","/en/stages/ISW-NO_合伙人会议/__data.json","/en/stages/ISW-NO_湖中魇","/en/stages/ISW-NO_湖中魇/__data.json","/en/stages/ISW-NO_灰坑","/en/stages/ISW-NO_灰坑/__data.json","/en/stages/ISW-NO_死箱","/en/stages/ISW-NO_死箱/__data.json","/en/stages/ISW-NO_活木","/en/stages/ISW-NO_活木/__data.json","/en/stages/ISW-NO_搏杀","/en/stages/ISW-NO_搏杀/__data.json","/en/stages/ISW-NO_共斗","/en/stages/ISW-NO_共斗/__data.json","/en/stages/ISW-NO_强买强卖","/en/stages/ISW-NO_强买强卖/__data.json","/en/stages/ISW-NO_进退趋同","/en/stages/ISW-NO_进退趋同/__data.json","/en/stages/ISW-NO_枯枝","/en/stages/ISW-NO_枯枝/__data.json","/en/stages/ISW-NO_败叶","/en/stages/ISW-NO_败叶/__data.json","/ja/stages/ISW-NO_猎犬病原","/ja/stages/ISW-NO_猎犬病原/__data.json","/ja/stages/ISW-NO_遗忘时间","/ja/stages/ISW-NO_遗忘时间/__data.json","/ja/stages/ISW-NO_急不可耐","/ja/stages/ISW-NO_急不可耐/__data.json","/ja/stages/ISW-NO_灌水贤者","/ja/stages/ISW-NO_灌水贤者/__data.json","/ja/stages/ISW-NO_虫虫游戏厅","/ja/stages/ISW-NO_虫虫游戏厅/__data.json","/ja/stages/ISW-NO_无主地","/ja/stages/ISW-NO_无主地/__data.json","/ja/stages/ISW-NO_本性难移","/ja/stages/ISW-NO_本性难移/__data.json","/ja/stages/ISW-NO_远北猎场","/ja/stages/ISW-NO_远北猎场/__data.json","/ja/stages/ISW-NO_枝头陷阱","/ja/stages/ISW-NO_枝头陷阱/__data.json","/ja/stages/ISW-NO_木本玉米","/ja/stages/ISW-NO_木本玉米/__data.json","/ja/stages/ISW-NO_预算否决","/ja/stages/ISW-NO_预算否决/__data.json","/ja/stages/ISW-NO_生存习性","/ja/stages/ISW-NO_生存习性/__data.json","/ja/stages/ISW-NO_辟路行进","/ja/stages/ISW-NO_辟路行进/__data.json","/ja/stages/ISW-NO_趁火打劫","/ja/stages/ISW-NO_趁火打劫/__data.json","/ja/stages/ISW-NO_焦土之家","/ja/stages/ISW-NO_焦土之家/__data.json","/ja/stages/ISW-NO_黑色逆流","/ja/stages/ISW-NO_黑色逆流/__data.json","/ja/stages/ISW-NO_圆石技艺","/ja/stages/ISW-NO_圆石技艺/__data.json","/ja/stages/ISW-NO_未来见闻","/ja/stages/ISW-NO_未来见闻/__data.json","/ja/stages/ISW-NO_种植园惊魂","/ja/stages/ISW-NO_种植园惊魂/__data.json","/ja/stages/ISW-NO_选边站","/ja/stages/ISW-NO_选边站/__data.json","/ja/stages/ISW-NO_诞生礼","/ja/stages/ISW-NO_诞生礼/__data.json","/ja/stages/ISW-NO_暴力押运","/ja/stages/ISW-NO_暴力押运/__data.json","/ja/stages/ISW-NO_长刀寒夜","/ja/stages/ISW-NO_长刀寒夜/__data.json","/ja/stages/ISW-NO_侵占家园","/ja/stages/ISW-NO_侵占家园/__data.json","/ja/stages/ISW-NO_取景胜地","/ja/stages/ISW-NO_取景胜地/__data.json","/ja/stages/ISW-NO_安魂节起义","/ja/stages/ISW-NO_安魂节起义/__data.json","/ja/stages/ISW-NO_一步之遥","/ja/stages/ISW-NO_一步之遥/__data.json","/ja/stages/ISW-NO_物欲遮天","/ja/stages/ISW-NO_物欲遮天/__data.json","/ja/stages/ISW-NO_恶意讨薪","/ja/stages/ISW-NO_恶意讨薪/__data.json","/ja/stages/ISW-NO_送别仪式","/ja/stages/ISW-NO_送别仪式/__data.json","/ja/stages/ISW-NO_彼处水如酒","/ja/stages/ISW-NO_彼处水如酒/__data.json","/ja/stages/ISW-NO_丛林法则","/ja/stages/ISW-NO_丛林法则/__data.json","/ja/stages/ISW-NO_过度繁殖","/ja/stages/ISW-NO_过度繁殖/__data.json","/ja/stages/ISW-NO_灵魂归宿","/ja/stages/ISW-NO_灵魂归宿/__data.json","/ja/stages/ISW-NO_刺生灾害","/ja/stages/ISW-NO_刺生灾害/__data.json","/ja/stages/ISW-NO_命运共享","/ja/stages/ISW-NO_命运共享/__data.json","/ja/stages/ISW-NO_同域共存","/ja/stages/ISW-NO_同域共存/__data.json","/ja/stages/ISW-NO_无效验尸","/ja/stages/ISW-NO_无效验尸/__data.json","/ja/stages/ISW-NO_贫瘠行军","/ja/stages/ISW-NO_贫瘠行军/__data.json","/ja/stages/ISW-NO_不解之缘","/ja/stages/ISW-NO_不解之缘/__data.json","/ja/stages/ISW-NO_铁腕迷思","/ja/stages/ISW-NO_铁腕迷思/__data.json","/ja/stages/ISW-NO_光荣远征","/ja/stages/ISW-NO_光荣远征/__data.json","/ja/stages/ISW-NO_狂热敬虔","/ja/stages/ISW-NO_狂热敬虔/__data.json","/ja/stages/ISW-NO_哀悼铁腕","/ja/stages/ISW-NO_哀悼铁腕/__data.json","/ja/stages/ISW-NO_赤金厄运","/ja/stages/ISW-NO_赤金厄运/__data.json","/ja/stages/ISW-NO_冰冷流亡","/ja/stages/ISW-NO_冰冷流亡/__data.json","/ja/stages/ISW-DF_永无安宁","/ja/stages/ISW-DF_永无安宁/__data.json","/ja/stages/ISW-DF_混沌源阶理论","/ja/stages/ISW-DF_混沌源阶理论/__data.json","/ja/stages/ISW-DF_痛苦将息","/ja/stages/ISW-DF_痛苦将息/__data.json","/ja/stages/ISW-DF_失恒常量","/ja/stages/ISW-DF_失恒常量/__data.json","/ja/stages/ISW-DF_畸症","/ja/stages/ISW-DF_畸症/__data.json","/ja/stages/ISW-DF_熄日","/ja/stages/ISW-DF_熄日/__data.json","/ja/stages/ISW-NO_血夜回魂","/ja/stages/ISW-NO_血夜回魂/__data.json","/ja/stages/ISW-NO_毛绒游戏","/ja/stages/ISW-NO_毛绒游戏/__data.json","/ja/stages/ISW-NO_在劫难逃","/ja/stages/ISW-NO_在劫难逃/__data.json","/ja/stages/ISW-NO_咩的朋友","/ja/stages/ISW-NO_咩的朋友/__data.json","/ja/stages/ISW-NO_外显尖牙","/ja/stages/ISW-NO_外显尖牙/__data.json","/ja/stages/ISW-NO_一视同仁","/ja/stages/ISW-NO_一视同仁/__data.json","/ja/stages/ISW-NO_易燃隐患","/ja/stages/ISW-NO_易燃隐患/__data.json","/ja/stages/ISW-NO_“闹乐”","/ja/stages/ISW-NO_“闹乐”/__data.json","/ja/stages/ISW-NO_“纵怒”","/ja/stages/ISW-NO_“纵怒”/__data.json","/ja/stages/ISW-NO_“灭身”","/ja/stages/ISW-NO_“灭身”/__data.json","/ja/stages/ISW-NO_晶矿惊蝗","/ja/stages/ISW-NO_晶矿惊蝗/__data.json","/ja/stages/ISW-NO_陌生旅伴","/ja/stages/ISW-NO_陌生旅伴/__data.json","/ja/stages/ISW-NO_安保措施","/ja/stages/ISW-NO_安保措施/__data.json","/ja/stages/ISW-NO_开业剪彩","/ja/stages/ISW-NO_开业剪彩/__data.json","/ja/stages/ISW-NO_合伙人会议","/ja/stages/ISW-NO_合伙人会议/__data.json","/ja/stages/ISW-NO_湖中魇","/ja/stages/ISW-NO_湖中魇/__data.json","/ja/stages/ISW-NO_灰坑","/ja/stages/ISW-NO_灰坑/__data.json","/ja/stages/ISW-NO_死箱","/ja/stages/ISW-NO_死箱/__data.json","/ja/stages/ISW-NO_活木","/ja/stages/ISW-NO_活木/__data.json","/ja/stages/ISW-NO_搏杀","/ja/stages/ISW-NO_搏杀/__data.json","/ja/stages/ISW-NO_共斗","/ja/stages/ISW-NO_共斗/__data.json","/ja/stages/ISW-NO_强买强卖","/ja/stages/ISW-NO_强买强卖/__data.json","/ja/stages/ISW-NO_进退趋同","/ja/stages/ISW-NO_进退趋同/__data.json","/ja/stages/ISW-NO_枯枝","/ja/stages/ISW-NO_枯枝/__data.json","/ja/stages/ISW-NO_败叶","/ja/stages/ISW-NO_败叶/__data.json"]);

const server = new Server(manifest);

// parse_origin validates ORIGIN and throws descriptive errors for invalid values
const origin = parse_origin(env('ORIGIN', undefined));

const xff_depth = parseInt(env('XFF_DEPTH', '1'));
const address_header = env('ADDRESS_HEADER', '').toLowerCase();
const protocol_header = env('PROTOCOL_HEADER', '').toLowerCase();
const host_header = env('HOST_HEADER', '').toLowerCase();
const port_header = env('PORT_HEADER', '').toLowerCase();

const body_size_limit = parse_as_bytes(env('BODY_SIZE_LIMIT', '512K'));

if (isNaN(body_size_limit)) {
	throw new Error(
		`Invalid BODY_SIZE_LIMIT: '${env('BODY_SIZE_LIMIT')}'. Please provide a numeric value.`
	);
}

const asset_dir = `${dir}/client${""}`;

await server.init({
	env: /** @type {Record<string, string>} */ (process.env),
	read: (file) => createReadableStream(`${asset_dir}/${file}`)
});

/**
 * @param {string} path
 * @param {boolean} client
 */
function serve(path, client = false) {
	return fs__default.existsSync(path)
		? sirv(path, {
				etag: true,
				gzip: true,
				brotli: true,
				setHeaders: client
					? (res, pathname) => {
							// only apply to build directory, not e.g. version.json
							if (
								pathname.startsWith(`/${manifest.appPath}/immutable/`) &&
								res.statusCode === 200
							) {
								res.setHeader('cache-control', 'public,max-age=31536000,immutable');
							}
						}
					: undefined
			})
		: undefined;
}

// required because the static file server ignores trailing slashes
/** @returns {import('polka').Middleware} */
function serve_prerendered() {
	const handler = serve(path.join(dir, 'prerendered'));

	return (req, res, next) => {
		let { pathname, search, query } = parse$1(req);

		try {
			pathname = decodeURIComponent(pathname);
		} catch {
			// ignore invalid URI
		}

		if (prerendered.has(pathname)) {
			return handler?.(req, res, next);
		}

		// remove or add trailing slash as appropriate
		let location = pathname.at(-1) === '/' ? pathname.slice(0, -1) : pathname + '/';
		if (prerendered.has(location)) {
			if (query) location += search;
			res.writeHead(308, { location }).end();
		} else {
			void next();
		}
	};
}

/** @type {import('polka').Middleware} */
const ssr = async (req, res) => {
	/** @type {Request} */
	let request;

	try {
		request = await getRequest({
			base: origin || get_origin(req.headers),
			request: req,
			bodySizeLimit: body_size_limit
		});
	} catch {
		res.statusCode = 400;
		res.end('Bad Request');
		return;
	}

	const response = await server.respond(request, {
		platform: { req },
		getClientAddress: () => {
			if (address_header) {
				if (!(address_header in req.headers)) {
					throw new Error(
						`Address header was specified with ${
							env_prefix + 'ADDRESS_HEADER'
						}=${address_header} but is absent from request`
					);
				}

				const value = /** @type {string} */ (req.headers[address_header]) || '';

				if (address_header === 'x-forwarded-for') {
					const addresses = value.split(',');

					if (xff_depth < 1) {
						throw new Error(`${env_prefix + 'XFF_DEPTH'} must be a positive integer`);
					}

					if (xff_depth > addresses.length) {
						throw new Error(
							`${env_prefix + 'XFF_DEPTH'} is ${xff_depth}, but only found ${
								addresses.length
							} addresses`
						);
					}
					return addresses[addresses.length - xff_depth].trim();
				}

				return value;
			}

			return (
				req.connection?.remoteAddress ||
				// @ts-expect-error
				req.connection?.socket?.remoteAddress ||
				req.socket?.remoteAddress ||
				// @ts-expect-error
				req.info?.remoteAddress
			);
		}
	});

	// Reverse proxies such as nginx buffer responses by default (ignoring
	// `cache-control`), which breaks streaming responses like server-sent events.
	// `X-Accel-Buffering: no` opts out of that buffering and is a no-op on proxies
	// that don't recognise it. See https://github.com/sveltejs/kit/issues/15790
	if (response.headers.get('content-type') === 'text/event-stream') {
		response.headers.set('x-accel-buffering', 'no');
	}

	await setResponse(res, response);
};

/** @param {import('polka').Middleware[]} handlers */
function sequence(handlers) {
	/** @type {import('polka').Middleware} */
	return (req, res, next) => {
		/**
		 * @param {number} i
		 * @returns {ReturnType<import('polka').Middleware>}
		 */
		function handle(i) {
			if (i < handlers.length) {
				return handlers[i](req, res, () => handle(i + 1));
			} else {
				return next();
			}
		}

		return handle(0);
	};
}

/**
 * @param {string} name
 * @param {string | string[] | undefined} value
 * @returns {string | undefined}
 */
function normalise_header(name, value) {
	if (!name) return undefined;
	if (Array.isArray(value)) {
		if (value.length === 0) return undefined;
		if (value.length === 1) return value[0];
		throw new Error(
			`Multiple values provided for ${name} header where only one expected: ${value}`
		);
	}
	return value;
}

/**
 * @param {import('http').IncomingHttpHeaders} headers
 * @returns {string}
 */
function get_origin(headers) {
	const protocol = decodeURIComponent(
		normalise_header(protocol_header, headers[protocol_header]) || 'https'
	);

	// this helps us avoid host injections through the protocol header
	if (protocol.includes(':')) {
		throw new Error(
			`The ${protocol_header} header specified ${protocol} which is an invalid because it includes \`:\`. It should only contain the protocol scheme (e.g. \`https\`)`
		);
	}

	const host =
		normalise_header(host_header, headers[host_header]) ||
		normalise_header('host', headers['host']);
	if (!host) {
		const header_names = host_header ? `${host_header} or host headers` : 'host header';
		throw new Error(
			`Could not determine host. The request must have a value provided by the ${header_names}`
		);
	}

	const port = normalise_header(port_header, headers[port_header]);
	if (port && isNaN(+port)) {
		throw new Error(
			`The ${port_header} header specified ${port} which is an invalid port because it is not a number. The value should only contain the port number (e.g. 443)`
		);
	}

	return port ? `${protocol}://${host}:${port}` : `${protocol}://${host}`;
}

const handler = sequence(
	/** @type {(import('sirv').RequestHandler | import('polka').Middleware)[]} */
	([serve(path.join(dir, 'client'), true), serve_prerendered(), ssr].filter(Boolean))
);

export { format_listening_address as f, handler as h, polka as p };
//# sourceMappingURL=handler-DhuhurCs.js.map
