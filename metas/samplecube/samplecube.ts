
export class SampleCube implements ISystem {
  META_ID = 52 // Change to your MetaZone meta number identifier

  api = null
  host = null

  /// --- Lets make a Cube ---
  cube = null

  /**
   * Initial scene setup, create all objects in the constructor.
   *
   * @param api          Used to call MetaZone API endpoints.
   * @param host_data    Very first
   */
  constructor(api, host_data) {
    // Save api
    this.api = api;



    ///////// Your static scene assets ///////////
    // Initialize all scene entities here

    /// --- Load your resources from your meta folder ---
    let myTexture = new Texture('metas/samplecube/materials/yourtexture.png')
    let myEmissive = new Texture('metas/samplecube/materials/yourtexture_emissive.png')

    /// --- Lets spawn the Cube ---
    this.cube = new Entity()
    this.cube.addComponent(new BoxShape())
    this.cube.addComponent(new Material())
    this.cube.getComponent(Material).albedoTexture = myTexture
    this.cube.getComponent(Material).emissiveTexture = myEmissive
    this.cube.getComponent(Material).transparencyMode = 2
    this.cube.addComponent(new Transform({
      position: new Vector3(0, 2, 0)
    }))
    this.cube.addComponent(new OnPointerDown(e => {
      // Change to a random color
      this.cube.getComponent(Material).emissiveColor = Color3.Random()
    },
    {
      button: ActionButton.ANY,
      showFeedback: true,
      hoverText: "www.MetaZone.io",
      distance: 8
    }))
    // Make sure to set the parent to the main this.metaEntity of each unique
    // entity, so when an owner moves the meta, everything moves with it.
    engine.addEntity(this.cube)

    ///////// Your static scene assets ///////////



    // Initial host data
    this.refreshHost(host_data)
  }

  /**
   * A Decentraland provided function where you should put your code that
   * repeats over and over.
   *
   * @param dt     Delta time since last update
   */
  update(dt: number) {

    /// --- Lets continually rotate our Cube ---
    this.cube.getComponent(Transform).rotate(Vector3.Up(), dt * 15)

  }

  /**
   * A MetaZone provided function that containst data customized by the
   * landowner on the MetaZone backend. This gets called every minute when it is
   * deployed live. During testing its called once in the game.ts file.
   *
   * @param host_data    Data sent from the MetaZone backend to update your Meta
   */
  refreshHost(host_data) {
    // Save host info
    this.host = host_data

    // Parse metadata
    if(this.host.metadata) {
      let metadata = JSON.parse(this.host.metadata)

      ///////// Your landowner adjustable content ///////////
      // You decide which of your creation's entities the landowner can adjust.

      /// --- Lets adjust our Cube ---
      this.cube.getComponent(Transform).position.set(
        metadata.cube.position.x,
        metadata.cube.position.y,
        metadata.cube.position.z
      )
      this.cube.getComponent(Transform).scale.set(
        metadata.cube.scale.x,
        metadata.cube.scale.y,
        metadata.cube.scale.z
      )
      this.cube.getComponent(Transform).rotation.setEuler(
        metadata.cube.rotation.x,
        metadata.cube.rotation.y,
        metadata.cube.rotation.z
      )

      ///////// Your landowner adjustable content ///////////
    }
  }

}
