let bazCode = 0;

class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title);
        this.engine.addChoice("Start");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation);
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key];
        this.engine.show(locationData.Body);

        if (locationData == this.engine.storyData.Locations.Button && !bazCode) {
            this.engine.addChoice(locationData.Choices[0].Text, locationData.Choices[0]);
            this.engine.addChoice(locationData.Choices[1].Text, locationData.Choices[1]);
        } else if (locationData == this.engine.storyData.Locations.Button && bazCode) {
            this.engine.addChoice(locationData.Choices[2].Text, locationData.Choices[2]);
        }

        else if (locationData.Choices && locationData.Choices.length > 0) {
            for (let choice of locationData.Choices) {
                this.engine.addChoice(choice.Text, choice);
            }
        } else if (locationData == this.engine.storyData.Locations.Nothing){
            this.engine.gotoScene(Location, this.engine.storyData.InitialLocation);
        } else if (locationData == this.engine.storyData.Locations.appleID){
            this.engine.gotoScene(Location, this.engine.storyData.Loc1);
        } else if (locationData == this.engine.storyData.Locations.Thanks){
            bazCode = 1;
            this.engine.gotoScene(Location, this.engine.storyData.InitialLocation);
        } else {
            this.engine.addChoice("The end.");
        }
    }

    handleChoice(choice) {

        if (choice) {
            this.engine.show("&gt; " + choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');