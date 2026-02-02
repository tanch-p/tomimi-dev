import * as THREE from 'three';
import * as spine from '$lib/spine';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { getTrapModelType } from '$lib/functions/trapHelpers';

const ENEMY_KEYS_TO_IGNORE = [
	'enemy_2047_smtree',
	'enemy_1177_dufrbl_2',
	'enemy_1177_dufrbl',
	'enemy_2083_skzhg',
	'enemy_2040_syrott',
	'enemy_2096_skzamj',
	'enemy_2095_skzamf',
	'enemy_10102_crblt',
	'enemy_10041_cnvfire',
	'enemy_10062_cjblon',
	'enemy_10061_cjglon',
	'enemy_10063_cjdoor_2',
	'enemy_1400_dhtbgj',
	'enemy_1398_dhdcr',
	'enemy_10009_sggem',
	'enemy_1294_duchns',
	'enemy_2121_dyspl2'
];

const SPINE_TEXT_IDS = ['enemy_3010_mcreep', 'enemy_10120_uaghst', 'enemy_10120_uaghst_2','enemy_10121_uasnip','enemy_1571_mirbst'];

const ENEMY_KEYS_TO_REPLACE = {
	enemy_2097_skzfdd: 'enemy_2082_skzdd',
	enemy_2098_skzftx: 'enemy_2081_skztxs',
	enemy_2099_skzfkl: 'enemy_2089_skzjkl',
	enemy_2100_skzfmf: 'enemy_1528_manfri',
	enemy_1313_wdfmr_2: 'enemy_1313_wdfmr',
	enemy_2113_dyhlg2: 'enemy_2112_dyhlgy',
	enemy_2119_dyshhj_2: 'enemy_2119_dyshhj'
};
const texturesToLoad = [
	{
		fileName: 'font_atlas.png',
		options: [],
		textures: [
			[
				'0',
				{
					UVWidth: 0.25,
					UVHeight: 0.25,
					uvOffsetX: 0,
					uvOffsetY: 0.75
				}
			],
			[
				'1',
				{
					UVWidth: 0.25,
					UVHeight: 0.25,
					uvOffsetX: 0.25,
					uvOffsetY: 0.75
				}
			],
			[
				'2',
				{
					UVWidth: 0.25,
					UVHeight: 0.25,
					uvOffsetX: 0.5,
					uvOffsetY: 0.75
				}
			],
			[
				'3',
				{
					UVWidth: 0.25,
					UVHeight: 0.25,
					uvOffsetX: 0,
					uvOffsetY: 0.5
				}
			],
			[
				'4',
				{
					UVWidth: 0.25,
					UVHeight: 0.25,
					uvOffsetX: 0.25,
					uvOffsetY: 0.5
				}
			],
			[
				'5',
				{
					UVWidth: 0.25,
					UVHeight: 0.25,
					uvOffsetX: 0.5,
					uvOffsetY: 0.5
				}
			],
			[
				'6',
				{
					UVWidth: 0.25,
					UVHeight: 0.25,
					uvOffsetX: 0,
					uvOffsetY: 0.25
				}
			],
			[
				'7',
				{
					UVWidth: 0.25,
					UVHeight: 0.25,
					uvOffsetX: 0.25,
					uvOffsetY: 0.25
				}
			],
			[
				'8',
				{
					UVWidth: 0.25,
					UVHeight: 0.25,
					uvOffsetX: 0.5,
					uvOffsetY: 0.25
				}
			],
			[
				'9',
				{
					UVWidth: 0.25,
					UVHeight: 0.25,
					uvOffsetX: 0,
					uvOffsetY: 0
				}
			]
		]
	},
	{
		fileName: 'sprite_shadow.png',
		options: [],
		textures: [['sprite_shadow', null]]
	},
	{
		fileName: 'parasitic.png',
		options: [],
		textures: [['parasitic', null]]
	},
	{
		fileName: 'Special_juntan_02.png',
		options: [],
		textures: [['creep', null]]
	},
	{
		fileName: 'floor_icons.png',
		options: ['colorSpace', 'filter'],
		textures: [
			['floorIcons', null],
			[
				'tile_healing',
				{
					UVWidth: 0.21,
					UVHeight: 0.21,
					uvOffsetX: 0.278,
					uvOffsetY: 0.774
				}
			],
			[
				'tile_defup',
				{
					UVWidth: 0.21,
					UVHeight: 0.21,
					uvOffsetX: 0.545,
					uvOffsetY: 0.774
				}
			],
			[
				'tile_gazebo',
				{
					UVWidth: 0.21,
					UVHeight: 0.21,
					uvOffsetX: 0.02,
					uvOffsetY: 0.52
				}
			],
			[
				'tile_infection',
				{
					UVWidth: 0.21,
					UVHeight: 0.21,
					uvOffsetX: 0.276,
					uvOffsetY: 0.516
				}
			],
			[
				'tile_bigforce',
				{
					UVWidth: 0.21,
					UVHeight: 0.21,
					uvOffsetX: 0.545,
					uvOffsetY: 0.516
				}
			],
			[
				'tile_defbreak',
				{
					UVWidth: 0.25,
					UVHeight: 0.24,
					uvOffsetX: 0.773,
					uvOffsetY: 0.49
				}
			],
			[
				'tel_arrow_0',
				{
					UVWidth: 0.04,
					UVHeight: 0.17,
					uvOffsetX: 0.9,
					uvOffsetY: 0.26
				}
			],
			[
				'tel_arrow_1',
				{
					UVWidth: 0.04,
					UVHeight: 0.17,
					uvOffsetX: 0.85,
					uvOffsetY: 0.26
				}
			],
			[
				'tel_arrow_2',
				{
					UVWidth: 0.04,
					UVHeight: 0.17,
					uvOffsetX: 0.799,
					uvOffsetY: 0.26
				}
			],
			[
				'tel_arrow_3',
				{
					UVWidth: 0.04,
					UVHeight: 0.17,
					uvOffsetX: 0.739,
					uvOffsetY: 0.26
				}
			],
			[
				'tel_arrow_-1',
				{
					UVWidth: 0.04,
					UVHeight: 0.17,
					uvOffsetX: 0.95,
					uvOffsetY: 0.26
				}
			],
			[
				'tel_block_in',
				{
					UVWidth: 0.25,
					UVHeight: 0.25,
					uvOffsetX: 0.75,
					uvOffsetY: 0
				}
			],
			[
				'tel_block_out',
				{
					UVWidth: 0.25,
					UVHeight: 0.25,
					uvOffsetX: 0.5,
					uvOffsetY: 0
				}
			]
		]
	},
	{
		fileName: 'floor_icons_e.png',
		options: ['colorSpace', 'filter'],
		textures: [['tel_e_map', null]]
	},
	{
		fileName: 'map_object_texture.png',
		options: ['colorSpace'],
		textures: [
			['blueBox', { UVWidth: 0.43, UVHeight: 0.42, uvOffsetX: 0.49, uvOffsetY: 0.49 }],
			['fly_icon', { UVWidth: 0.5, UVHeight: 0.5, uvOffsetX: 0, uvOffsetY: 0 }]
			// ['fly_box', { UVWidth: 0.5, UVHeight: 0.5, uvOffsetX: 0.5, uvOffsetY: 0 }]
		]
	},
	{
		fileName: 'T_Map_Trainingroom_A.png',
		options: ['colorSpace', 'filter'],
		textures: [
			[
				'tile_wall',
				{
					UVWidth: 0.1445,
					UVHeight: 0.1445,
					uvOffsetX: 0.324,
					uvOffsetY: 0.62
				}
			],
			[
				'tile_grass',
				{
					UVWidth: 0.09,
					UVHeight: 0.09,
					uvOffsetX: 0.615,
					uvOffsetY: 0.133
				}
			],
			[
				'tile_volcano',
				{
					UVWidth: 0.12,
					UVHeight: 0.12,
					uvOffsetX: 0.6,
					uvOffsetY: 0
				}
			]
		]
	},
	{
		fileName: 'T_common_A.png',
		options: ['colorSpace', 'filter'],
		textures: [
			[
				'tile_floor',
				{
					UVWidth: 0.25,
					UVHeight: 0.25,
					uvOffsetX: 0,
					uvOffsetY: 0.75
				}
			],
			[
				'hole_hazard_horiz',
				{
					UVWidth: 0.24,
					UVHeight: 0.02,
					uvOffsetX: 0,
					uvOffsetY: 0.75
				}
			],
			[
				'hole_hazard_vert',
				{
					UVWidth: 0.02,
					UVHeight: 0.24,
					uvOffsetX: 0,
					uvOffsetY: 0.75
				}
			]
		]
	},
	{
		fileName: 'flag.png',
		options: ['colorSpace', 'filter'],
		textures: [['flag', null]]
	}
];

export class AssetManager {
	private static instance: AssetManager;
	private textureLoader: THREE.TextureLoader = new THREE.TextureLoader();
	private spineAssetManager: spine.AssetManager = new spine.AssetManager('/spine/');
	private gltfLoader = new GLTFLoader().setPath('/models/');

	public models = new Map();
	public textures = new Map();
	public spineMap = new Map();
	public font;
	public texturesLoaded = false;
	public fontAtlas;

	private constructor() {
		// Private constructor to prevent instantiation
	}
	public static getInstance(): AssetManager {
		if (!AssetManager.instance) {
			AssetManager.instance = new AssetManager();
		}
		return AssetManager.instance;
	}

	async loadAssets(mapConfig) {
		this.texturesLoaded = false;
		this.models.clear();
		this.spineMap.clear();
		this.spineAssetManager.removeAll();
		const promises = [];

		if (mapConfig?.levelId === 'level_rogue4_b-8' && !this.textures.has('skzamj')) {
			promises.push(
				new Promise((resolve, reject) => {
					this.textureLoader.load(
						`/textures/skzamj.png`,
						(texture) => {
							resolve(texture);
						},
						undefined,
						(error) => {
							reject(error);
						}
					);
				}).then((texture: THREE.Texture) => {
					texture.colorSpace = THREE.SRGBColorSpace;
					texture.magFilter = THREE.NearestFilter; // Keeps pixel art sharp
					texture.minFilter = THREE.NearestFilter;
					this.textures.set('skzamj', { texture: texture, config: null });
				})
			);
		}
		this.loadEnemyIcons(promises, mapConfig);

		if (!this.texturesLoaded) {
			const loader = new FontLoader();
			promises.push(
				new Promise((resolve) => {
					loader.load('/fonts/noto_sans_regular.json', (font) => {
						resolve(font);
					});
				}).then((font) => (this.font = font))
			);
			for (const { fileName, options, textures } of texturesToLoad) {
				promises.push(
					new Promise((resolve, reject) => {
						this.textureLoader.load(
							`/textures/${fileName}`,
							(texture) => {
								resolve(texture);
							},
							undefined,
							(error) => {
								reject(error);
							}
						);
					}).then((texture: THREE.Texture) => {
						if (options.includes('colorSpace')) {
							texture.colorSpace = THREE.SRGBColorSpace;
						}
						if (options.includes('filter')) {
							texture.magFilter = THREE.NearestFilter; // Keeps pixel art sharp
							texture.minFilter = THREE.NearestFilter;
						}
						for (const [name, config] of textures) {
							this.textures.set(name, { texture: texture, config: config });
						}
					})
				);
			}
		}
		const enemyKeys = mapConfig?.enemies.reduce((acc, curr) => {
			if (!acc.includes(curr.prefabKey)) {
				acc.push(curr.prefabKey);
			}
			return acc;
		}, []);
		for (const key of enemyKeys) {
			if (ENEMY_KEYS_TO_IGNORE.includes(key) || this.spineMap.has(key)) {
				continue;
			}
			let fileKey = ENEMY_KEYS_TO_REPLACE[key] || key;
			const folder = fileKey.replace('enemy_', '');
			promises.push(
				new Promise((resolve, reject) => {
					if (SPINE_TEXT_IDS.includes(key)) {
						this.spineAssetManager.loadText(`${folder}/${fileKey}`);
					} else {
						this.spineAssetManager.loadBinary(`${folder}/${fileKey}.skel`);
					}
					this.spineAssetManager.loadTextureAtlas(
						`${folder}/${fileKey}.atlas`
					);

					const checkLoading = () => {
						if (this.spineAssetManager.isLoadingComplete()) {
							resolve();
						} else {
							requestAnimationFrame(checkLoading);
						}
					};

					checkLoading();
				}).then(() => {
					const atlas = this.spineAssetManager.get(
						`${folder}/${fileKey}.atlas`
					);
					const atlasLoader = new spine.AtlasAttachmentLoader(atlas);
					let skeletonData;
					if (SPINE_TEXT_IDS.includes(key)) {
						const skelJson = new spine.SkeletonJson(atlasLoader);
						skelJson.scale = 0.3;
						skeletonData = skelJson.readSkeletonData(
							JSON.parse(this.spineAssetManager.get(`${folder}/${fileKey}`))
						);
					} else {
						const skeletonBinary = new spine.SkeletonBinary(atlasLoader);
						skeletonBinary.scale = 0.3;
						skeletonData = skeletonBinary.readSkeletonData(
							this.spineAssetManager.get(`${folder}/${fileKey}.skel`)
						);
					}
					this.spineMap.set(key, skeletonData);
				})
			);
		}

		for (const trap of mapConfig?.traps.concat(mapConfig?.token_cards)) {
			const key = trap.key;
			const modelType = getTrapModelType(key);
			switch (modelType) {
				case 'spine':
					if (this.spineMap.has(key)) {
						continue;
					}
					promises.push(
						new Promise<void>((resolve, reject) => {
							this.spineAssetManager.loadBinary(`${key}/${key}.skel`);
							this.spineAssetManager.loadTextureAtlas(`${key}/${key}.atlas`);

							const checkLoading = () => {
								if (this.spineAssetManager.isLoadingComplete()) {
									resolve();
								} else {
									requestAnimationFrame(checkLoading);
								}
							};

							checkLoading();
						}).then(() => {
							const atlas = this.spineAssetManager.get(`${key}/${key}.atlas`);
							const atlasLoader = new spine.AtlasAttachmentLoader(atlas);
							const skeletonBinary = new spine.SkeletonBinary(atlasLoader);
							skeletonBinary.scale = 0.3;
							const skeletonData = skeletonBinary.readSkeletonData(
								this.spineAssetManager.get(`${key}/${key}.skel`)
							);
							this.spineMap.set(key, skeletonData);
						})
					);
					break;
				case 'model':
					if (this.models.has(key)) {
						continue;
					}
					promises.push(
						new Promise((resolve, reject) => {
							this.gltfLoader.load(
								`${key}.glb`,
								(gltf) => {
									resolve(gltf);
								},
								undefined,
								(error) => {
									reject(error);
								}
							);
						}).then((gltf) => {
							this.models.set(key, gltf.scene);
						})
					);
					break;
				case 'texture':
					if (this.textures.has(key)) {
						continue;
					}
					promises.push(
						new Promise((resolve, reject) => {
							this.textureLoader.load(
								`/images/chara_icons/${key}.webp`,
								(texture) => {
									resolve(texture);
								},
								undefined,
								(error) => {
									reject(error);
								}
							);
						}).then((texture: THREE.Texture) => {
							texture.colorSpace = THREE.SRGBColorSpace;
							texture.magFilter = THREE.NearestFilter; // Keeps pixel art sharp
							texture.minFilter = THREE.NearestFilter;
							this.textures.set(key, { texture: texture, config: null });
						})
					);
					break;
				default:
					break;
			}
		}
		return Promise.all(promises);
	}

	cleanup() {
		this.textures.clear();
		this.models.clear();
		this.spineMap.clear();
		this.spineAssetManager.removeAll();
	}

	loadEnemyIcons(promises, mapConfig) {
		//to use for enemies that are of 3D models but not available, enemy_10061_cjglon, enemy_10062_cjblon...
		const keysToHandle = ['enemy_10061_cjglon', 'enemy_10062_cjblon'];
		for (const key of keysToHandle) {
			if (mapConfig?.enemies.some((enemy) => enemy.prefabKey === key)) {
				promises.push(
					new Promise((resolve, reject) => {
						this.textureLoader.load(
							`/images/enemy_icons/${key}.webp`,
							(texture) => {
								resolve(texture);
							},
							undefined,
							(error) => {
								reject(error);
							}
						);
					}).then((texture: THREE.Texture) => {
						texture.colorSpace = THREE.SRGBColorSpace;
						texture.magFilter = THREE.NearestFilter; // Keeps pixel art sharp
						texture.minFilter = THREE.NearestFilter;
						this.textures.set(key, { texture: texture, config: null });
					})
				);
			}
		}
	}
}
