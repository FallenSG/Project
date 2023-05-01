import { useContext, useState, useEffect } from "react"; 
import { useLocation } from "react-router-dom";
import { 
    Typography, Button, Slider, Divider,
    List, ListItem, Drawer, Grid, Radio, Stack,
    RadioGroup, FormControlLabel, FormControl 
} from '@mui/material';
import {
    Close, Settings, FormatListNumbered, ArrowBackIos, ArrowForwardIos
} from '@mui/icons-material';
import { Parser } from 'html-to-react';
import WebFont from 'webfontloader'

import { Context, PageLayoutOverload } from "../Components/PageLayout";
import { useFetch } from "../customHooks/DataHandler";

const fontFamilies = ['Adamina', 'Abhaya Libre', 'Anaheim', 'Anonymous Pro', 'Barlow Semi'];
const themeSelection = [
    [
        "#E6C3AD", "hsl(23deg 53% 79% / 40%)", "#0D2035",
    ],
    [
        "#FFFAFA", "hsl(0deg 0% 99% / 40%)", "#000000"
    ],
    [
        "#E6F1F1", "hsl(180deg 28% 92% / 60%)", "#000000"
    ],
    [
        "#333333", "#333333", "#FFFFFF"
    ],
    [
        "#F4EFE7", "hsl(36.92deg 37.14% 93.14% / 50%)", "#000000"
    ],
    [
        "#FFFFE0", "hsl(60deg 100% 94% / 85%)", "#000000"
    ],
    [
        "#FFE5E5", "hsl(0deg 100% 94.9% / 75%)", "#000000"
    ],
    [
        "#E6E6FA", "hsl(240deg 67% 94% / 50%)", "#000000"
    ],
    [
        "#F5F5DC", "hsl(60deg 55.56% 91.18 % / 75%)", "#000000"
    ],

]

// const data = `<p></p><p> </p><h4>Chapter 1:Ruins Exploration Gone Wrong!</h4> <p></p><p> "MY ASS IS ON FIRE!"
// </p><p> "MY BUTT-HOLE IS BURNING!!!"
// </p><p> "F*CK, MAKE IT STOP PLEASE!!"
// </p><p> With an unsightly face filled with tears and snort, Felix clutched his ass cheeks tightly while rolling on the floor, leaving behind him a trail of blood that was coming out of his anus.
// </p><p> His shrieks kept echoing none stop inside a colossal hall that was floored using tiles embodies with colorful gems, walls dyed with amber color that was gleaming under the artificial light of milky white gems, which were holstered on the ceiling.
// </p><p> Their bright light displayed not just the walls, but everything that was inside the hall with vivid details.
// </p><p> Starting off with the soldiers' statues, that were standing uprightly at the corners of the hall, each holding a different type of weapon with one arm, while the other arm had a purplish chain rolled up their forearms. Just like they were trying to clasp it with their own dear life.
// </p><p> Those four purplish chains were connected to a small platform that was in the very center of the hall.
// </p><p> They shackled it so tight, that it was affixed mid-air without any support!
// </p><p> At the surface of the platform, a fist-sized flame that had no color just like water was floating and flickering gently above it. While underneath it, two corpses were lying unmoving.
// </p><p> Well, it was actually just one corpse, as the other was merely a blackened skeleton.
// </p><p> Slam!
// </p><p> Felix's unrestrained rolling was finally stopped, as he collided with the corpse. If his eyes weren't hazy from crying his heart out, he would have seen that he just slammed into Kathy.
// </p><p> His clan mate who joined the ruins exploration party just like him, seeking natural treasures and resources to further enhance her bloodline path. Alas, here she was lying cold with one of her eyeballs dug out from its roots.
// </p><p> Previously, her eye was assaulted by a needle made of colorless flame that was sent by that entity on the top of the platform.
// </p><p> She dug her own eye out, trying her best to remove that needle and stop the hellish agony it was causing her. Sadly, her present form was enough to entail that her attempt failed miserably.
// </p><p> Well, look at the bright side. At least she was not dealt with the same fate as Felix, who was still shrieking like a little girl, who just had her lollipop stolen.
// </p><p> Although his pained screams were a bit too b*tchy, Felix could totally be excused, since his butt-hole had just got penetrated by the same flame needle!
// </p><p> Finally not able to take anymore, he let one last scream and fainted with eyes rolled at the back of his head.
// </p><p> To understand why he was even in this f*cked up situation, one must first understand the events that led to this point in time.
// </p><p> ...
// </p><p> Seven days earlier, Felix's clan exploration crew picked up signals of a massive amount of energy coming from a destroyed planet nearby. They were on their way to the clan after successfully finishing their mission. But, after they noticed those signals, there was nowhere in hell they would have simply ignored them and move on.
// </p><p> Hence, they changed their course and went directly towards that said planet.
// </p><p> Immediately after landing, they noticed that the signals were coming from underneath a destroyed magnificent city that had half of its structures buried deep underground.
// </p><p> Just like any exploration team, their senses tingled that it was their lucky day. After all, they just found a deserted city that probably belonged to one of the superior races in the universe. The city magnificence even while destroyed made them reach such a conclusion.
// </p><p> Instead of reporting what they found to their clan like they were taught to, greed took the best of them and made them vote to explore the ruins by themselves.
// </p><p> However, the city was humongous and it would take them years to just explore half of it. Thus, the captain proposed to split up into teams made of three each.
// </p><p> Felix, Kathy, and Jayden, who sadly turned into a burned skeleton, formed one team and went to explore the western side of the city.
// </p><p> Obviously, during the first day, Felix's party didn't come across anything worthy of their attention. Nonetheless, they didn't give up, as they kept on searching for a path that led to the underground, hoping to be the first to reach the place where the signal was emitting from.
// </p><p> Yet, they still came out empty on the 2nd day as well.
// </p><p> Then, came the 3rd day, and still the same disappointing result. On the 4th day, nothing changed. On the 5th day, exhaustion started to wear them out. On the 6th day when they were just losing hope, Jaydan spotted a two-meter hole hidden underneath the bricks of a destroyed building, while he was taking a piss.
// </p><p> However, instead of telling his teammates, he decided to explore the tunnel solo. First come, first serve right?
// </p><p> Unfortunately, what he found deep underground weren't long lost legacies, inheritance, treasures, or such as they expected, but a long, very long semi-dark path that led to an unknown destination. Without further ado, he climbed up and went to inform Felix and Kathy.
// </p><p> The gloomy semi-dark path scared the shit out of him. He didn't have the guts to tread it alone.
// </p><p> After hearing the news, Felix made a decision to not report the situation to the rest but keep it to themselves.
// </p><p> Who could blame him though? The exploration crew had at least 54 bloodliner, all aiming to be the first to find the treasures.
// </p><p> Felix who was part of the weakest bunch in the crew wasn't a retard to give up on such an advantage for a pat in the head. Jaydan thought exactly like him. As for Kathy? She wasn't too eager on going with just the three of them alone.
// </p><p> However, few enticing words from Felix did the trick, making her drop her worry down and explore the path with them.
// </p><p> They walked, and walked, and continued to walk for a straight 12 hours before they finally spotted a sparkle of golden light at the end of the path. If their bodies weren't enhanced from their bloodline integration, they would have honestly dropped dead tired in the middle of the path.
// </p><p> They ran towards it with eager expressions. However, the moment they reached the end of the path and saw what was giving off that golden light, they couldn't help but stare wide-eyed, not daring to believe their eyes.
// </p><p> A gigantic broken gate made completely out of Heron Amber Stones. One of the rarest luxurious material in the known universe, that could only be extracted from the outer core of a planet, if the harsh conditions of its creation were met.
// </p><p> Yet this precious stone that could only be chanced upon by luck was being used for a humongous gate that reached 50 meters in height. Not to mention its width and depth.
// </p><div id="pf-2574-1" style="position: relative; margin: auto; clear: both; width: 300px;"><script>window.pubfuturetag = window.pubfuturetag || [];window.pubfuturetag.push({unit: "6333f35a6288d400280bf0e2", id: "pf-2574-1"})</script><script async="" src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script> <div id="300x250-1"> <script> window.googletag = window.googletag || {cmd: []}; googletag.cmd.push(function() { googletag.defineSlot('/21849154601,22666480937/Ad.Pub-300x250', [300, 250], '300x250-1').addService(googletag.pubads()); googletag.enableServices(); googletag.display('300x250-1'); }); </script> </div><div style="position: absolute; left: 0px; top: 0px; z-index: 10000000;"><div class="flex-container"> <a class="pf-br-icon" href="//pubfuture.com" target="_blank"> <img width="14" height="14" alt="Ads by Pubfuture" src="https://s3.pubfuture.com/favicon.ico"> </a> <a href="//pubfuture.com" class="pf-br-title" target="_blank">Ads by PubFuture</a> </div></div></div><p> They honestly were beyond speechless and on the verge of questioning their own reasoning.
// </p><p> Still, this gate just made their previous conclusion that the city belonged to an ancient superior race more solid.
// </p><p> They knew that those races were a league apart from the human race. Whether in strength, culture, wealth, and even technological advancement. There was just no fair comparison between the two.
// </p><p> This news didn't make them feel indignant but actually excited! Excited that whatever was behind that gate was definitely what they came for.
// </p><p> They rushed in direction of a slight opening at the bottom of the broken gate, resembling a rat hole in a wall.
// </p><p> Felix lay down and crawled on his stomach, eating dirt and dust, yet his eyes never stopped shimmering with delight for even a second. After he passed through, Kathy and Jaydan followed one by one.
// </p><p> Immediately after dusting their outfits, they raised their heads and stared in shock at the hall that had the small platform shackled mid-air by those four purplish chains and the soldiers' statues who were clasping tightly those chains.
// </p><p> Yet, what truly shocked them was actually the colorless flame, that appeared more like a sphere of water. If it wasn't flickering from time to time, they would have honestly assumed so. Still, they never saw or heard about such an uncanny flame in their entire life.
// </p><p> They knew that they just hit the jackpot! There was no way such a strange-looking flame wasn't a natural treasure. in their eyes, the flame must be a natural treasure for fire elemental users.
// </p><p> Although neither of them had a fire element, they still could sell it for a shit load of Supremacy Coins in the Universal Virtual Reality (UVR).
// </p><p> They traded quick glances between each other, not knowing how to carry on. There was only one flame, but three of them.
// </p><p> It was clear that trusting each other on holding the flame in their spatial card was not an option. They might be clan mates, but it didn't mean they were close tight friends.
// </p><p> Abruptly! Felix bolted towards the platform, uncaring about his teammates' ugly expression. He didn't give them a single second to think things through, before forcing them to race after him, trying their best to catch up.
// </p><p> Yet, he sneakily slowed down his speed, allowing those two to quickly surpass him. They didn't see anything odd about his lackluster speed, as they knew that he was probably still tired from their long walk in the path.
// </p><p> Felix kept slowing down his speed until he stopped all at once and retreated next to the hole, which they came from.
// </p><p> If those two didn't have their entire focus captured by the colorless flame, they would have noticed that he bailed out.
// </p><p> "Oh, Fresh souls to possess? Not bad."
// </p><p> Suddenly, Felix, Kathy, and Jayden all froze in shock after hearing an angelic voice in their minds, sweet and enticing that might let even the devil himself drop his guard down.
// </p><p> Kathy and Jayden who were the nearest to the flame spirit immediately turned around, planning to sprint towards Felix. They didn't know who spoke and they weren't about to stay still in their position to find out. Their gut feeling told them to back off as far as possible.
// </p><p> Unfortunately, the moment they entered the flame spirit territory and woke her up, their lives were pretty much doomed.
// </p><p> Phew! Phew!
// </p><p> Two colorless flame needles were thrown with the speed of light at their heads. One penetrated Jayden's ear, and the other penetrated Kathy's eye.
// </p><p> "Ahhhhhhhhh!!"
// </p><p> "Kyaaaaaaaaaaaaa!!"
// </p><p> Before Felix's brain could even comprehend what had just happened, he heard two agonizing screams, far surpassing whatever he had heard in his entire life.
// </p><p> His eyes landed on his two clan mates who were currently thrashing around, like fish caught in a net.
// </p><p> His legs stiffened not letting him take a single step back. He just kept watching scared shitless, Kathy uses two fingers to dig deep within her eyeball, trying to get out that needle. Alas, she dug nothing but her eyeball out with her pale hand covered in blood.
// </p><p> Yet she didn't seem to mind, as she only kept screaming and begging for the pain to be over. Sadly, neither her wish was fulfilled nor anyone came to her rescue. She only left two last whimpers before going silent once and for all.
// </p><p> "Tsk, she couldn't even handle the first stage of possession."
// </p><p> Confused as ever from how things escalated so fast, Felix switched his vision from Kathy's corpse into unexpectedly Jayden who just spoke!
// </p><p> Dumbfounded, His eyes made direct contact with Jaydan and instantly knew that was definitely someone else. However, just as Jayden opened up his mouth, trying to speak again, his body started to burn, turning his hands and legs first into ash, followed by his torso and head.
// </p><p> The only thing left from him were his blackened bones.
// </p><p> "Sh*t! Another failure. I had enough of this shitty place. It's been already 20 million years of Imprisonment. I f*cking had enough!" The flame spirit cursed in Felix's mind, waking him up from his stupor.
// </p><p> "Boy, you better not disappoint me as well." She said coldly.
// </p><p> Without a second delay, Felix turned around and lay on the floor, trying to crawl back inside the hole and leave this damned place.
// </p><p> The thought of fighting didn't even cross his mind, as he saw the speed those needles traveled with. He knew that all of his bloodline abilities didn't have a single way to defend against them. Not to mention, if he entered through the hole, his head would be completely protected from those needles, that were obviously targeting his weak vitals, to reach his brain and enter his consciousness.
// </p><p> "Do you think the ones before you didn't use the same strategy as yours?" She laughed like a deranged person and said, "I may not succeed in syncing our souls together, but at least I will add another butt-hole virginity to my collection."
// </p><p> "Thank you for that." She said sincerely.
// </p><p> Scared out of his wits by what he just heard, Felix reflexively tried to turn around and protect his ass. Yet, the hole was too tight to let him make such a large movement.
// </p><p> "Hold on a second!! Let's talk things through!!" He requested with a cracking voice, hoping to buy a couple of seconds to pass through the other side.
// </p><p> Unfortunately, the moment his torso was inside the hole, leaving his lower body outside in the open, he heard the spirit flame say in satisfaction, "Perfection. As all things should be."
// </p><p> "Noooooo!!!" He screamed subconsciously, as he felt that his ass was being targeted by a rapist.
// </p><p> Phew!
// </p><p> The needle flew straight to his anus, resembling a dart hitting the bullseye. The flame spirit must have practiced thousands of times to have such precise accuracy.
// </p><p> "Aaaaaaaaaaaaa!!!"
// </p><div id="pf-2750-1" style="position: relative; margin: auto; clear: both; width: 300px;"><script>window.pubfuturetag = window.pubfuturetag || [];window.pubfuturetag.push({unit: "634cdf9ed0fea70027ee0525", id: "pf-2750-1"})</script><script async="" src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script> <div id="300x250-3"> <script> window.googletag = window.googletag || {cmd: []}; googletag.cmd.push(function() { googletag.defineSlot('/21849154601,22666480937/Ad.Pub-300x250', [300, 250], '300x250-3').addService(googletag.pubads()); googletag.enableServices(); googletag.display('300x250-3'); }); </script> </div><div style="position: absolute; left: 0px; top: 0px; z-index: 10000000;"><div class="flex-container"> <a class="pf-br-icon" href="//pubfuture.com" target="_blank"> <img width="14" height="14" alt="Ads by Pubfuture" src="https://s3.pubfuture.com/favicon.ico"> </a> <a href="//pubfuture.com" class="pf-br-title" target="_blank">Ads by PubFuture</a> </div></div></div><p> "MY ASS IS MELTING!!"
// </p><p> "I AM SORRY FOR RUINING YOUR SLEEP! PLEASE LET ME GO!!"
// </p><p> Henceforth, a symphony of shrieks and beggings resounded in the hall and the semi-dark path. Felix kept trying to move, wanting to ease up the pain by a little bit, yet the hole he was in made it almost impossible.
// </p><p> Thus, he crawled back with his face planted on the dirt and hands clasped tightly on his ass cheeks.
// </p><p> Immediately after getting his entire body outside, he started rolling from the hole to where Kathy's corpse was, leaving behind a long trail of blood. The distance between the two wasn't a joke.
// </p><p> He really rolled himself out cold.
// </p><p> ....
// </p><p> Inside Felix's sea of consciousness...
// </p><p> A colorless flame slowly started to take the shape of a woman that had shoulder-length wavy crimson hair that shone with crystal luster.
// </p><p> Citrine yellowish eyes that radiate beams of light and heat just like stars. Above them, implausibly artistic black eyebrows, while beneath them, an elegantly straight nose, and wide and sensual bright rouge lips.
// </p><p> All of those ravishing characteristics were contained within a flawless elegant pale face, that's on an hourglass curvy body with a perfect sized chest and rear.
// </p><p> Anyone who saw this otherworldly beauty would agree that only the universe beauty could be compared to her. No matter their race or gender.
// </p><p> Unfortunately, this stunning image was ruined instantly, when she started to touch all of her assets while laughing hysterically.
// </p><p> "FINALLY! After 20 million years of imprisonment, and millions of souls that I failed to sync with. Finally! I found the perfect soul that matches mine without backlash!"
// </p><p> "I Asna Origin of Law, finally going to be free!"
// </p><p> Suddenly she calmed down her joy and thought, 'No matter what, I have to take control of this soul, even if I sacrifice part of my laws. I cannot let this chance slip by!'
// </p><p> Soon after, her form started to disintegrate into a mist that spread to cover the entire sea of consciousness.
// </p><p> However, just as she tried to ignite the mist so it would burn this consciousness and replace it, a shout filled with anger and humiliation resonated sonorously around the place, "Over my dead body, you old hag!"
// </p><p> The sea of consciousness that was just calm seconds ago, began to rise with waves hitting the walls surrendering it.
// </p><p> Roars of the sea covered the entire area, as the waves kept smashing the soul barrier, trying to demolish it.
// </p><p> Asna quickly figured what Felix was doing and yelled with a horrified voice, "Stop it, you idiot! Are you trying to kill yourself for eternity?!"
// </p><p> She quickly started to coax him logically, "Please stop, even If I destroyed your sea of consciousness, you can still be revived later, or at least be reborn in another form. And even if you detonated your soul I would not die with you!"
// </p><p> Felix, who just woke up for the most traumatizing experience in his life, was having none of her bullshit anymore, "I would rather be reborn as a void creature in the universe than let you have what you want."
// </p><p> "THIS IS FOR MY BUTT-HOLE VIRGINITY!" He shouted one last time, as his soul barrier began to collapse on the sea of consciousness.
// </p><p> Crash Crash!
// </p><p> "You Lunatic!!" Asna screamed in despair. Then suddenly her expression turned crazed as well.
// </p><p> 'I can't let this chance go by, I will start the merging process with his soul, and if it got destroyed, my existence will be erased with it as well since our souls will be connected. Even though it's not the freedom that I seek, but I would rather be erased then spent another second in this prison.'
// </p><p> A few moments later, she finished the process of merging successfully. She sighed in relief and waited for the explosion to happen with a peaceful mild smile.
// </p><p> Within the hall…
// </p><p> An Explosion that had the same power as of earthling's old age nuclear bomb went off abruptly, destroying... well just Jayden's bones and Kathy's corpse. The rest? Remained absolutely unscratched.
// </p><p> ...
// </p><p> At the moment of the explosion. Near the core of the same galaxy that Felix was currently at.
// </p><p> An Eye with an astronomical size unsealed itself silently. Its pupil was as dark as a black hole. Not a single light particle was being reflected on it.
// </p><p> It glanced at the direction of the explosion and pondered, 'Did something happen to the place I was imprisoned in?'
// </p><p> He kept looking at the same spot and instantly created a mirror that showcased everything that happened since the moment the spaceship arrived at the ruins.
// </p><p> 'Interesting, so that witch finally found a soul compatible enough to hold her shameless spirit without backlash.'
// </p><p> He then started to laugh out loud after seeing Felix detonating himself due to humiliation.
// </p><p> "Hahahaha, you deserve it, you wench. If those old fogies saw what you did, they will probably denounce you for ruining the image of the Unigin Race."
// </p><p> "But since you seek freedom that much, to the point of trying to even erase your existence, I will break the rules of our race and give you a hand."
// </p><p> He then gazed at the explosion and time was suddenly stopped in that place. Everything was suspended in the same position.
// </p><p> The eye looked deep within the explosion and saw a wisp of a soul that was in the process of being extinguished. Then, it sent two fingers that traveled through space-time and grabbed it swiftly towards its place.
// </p><p> …
// </p><p> 2 minutes later...
// </p><p> The eye kept scanning the soul wisp with intrigue. He realized that both of their souls had merged together to form one. But Felix's soul had total control of it. So, if he wanted to give Asna a second chance of life, Felix would benefit from it more than her, since she would only be viewing for his eyes with zero control.
// </p><p> "Hehe, that's for her to solve, not me.' Amused, he chuckled at the wisp one last time and then threw it at its humongous pupil.
// </p><p> The Eye Being sealed its eye slowly in exhaustion overusing space-time laws to send them into another timeline.
// </p><p> "Safe journey." He murmured one last time.</p>`;


function Sidebar({readStyle, handleUpd}){
    const toggleDrawer = (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        handleUpd('open', false);
    };

    const style = {
        flexDirection: "column",
        alignItems: "center"
    };

    const Content = (
        <List sx={{ 
            width: { xs: "100%", sm: "45vw", md: "35vw" },
            height: { xs: "50vh", sm: "100vh" } 
        }}>
            <ListItem sx={{ flexDirection: "row", justifyContent: "flex-end" }}>
                <Close onClick={() => handleUpd('open', false)} sx={{ cursor: "pointer" }} />
            </ListItem>
            <ListItem sx={{ ...style }}>
                <Typography variant="h4" sx={{ p: "0 16px" }}>Display Options</Typography>
            </ListItem>
            <Divider />
            <ListItem sx={{ ...style }}>
                <Typography variant="body1" sx={{ color: "#83848f" }}>Background</Typography>
            </ListItem>

            <ListItem sx={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap"
            }}>
                {
                    themeSelection.map((val, i) => 
                        <span key={i} id={i} 
                            onClick={() => handleUpd('theme', val)}
                            style={{ 
                                width: "45px", 
                                height: "45px", 
                                borderRadius: "50%",
                                backgroundColor: `${val[0]}`,
                                border: "thin solid",
                                margin: "5px",
                                cursor: "pointer"

                            }}>
                        </span>
                    )
                }
            </ListItem>
            <Divider />
            <ListItem sx={{ ...style }}>
                <Typography variant="body1" sx={{ color: "#83848f" }}>Size</Typography>

                <Slider
                    aria-label="Font Size"
                    value={readStyle.fontSize}
                    getAriaValueText={(value) => value}
                    onChange={(event, value) => handleUpd('fontSize', value)}
                    valueLabelDisplay="auto"
                    step={2}
                    marks
                    min={14}
                    max={36}
                    sx={{ maxWidth: { xs: "80vw", sm: "40vw", md: "30vw" } }}
                />
            </ListItem>
            <Divider />
            <ListItem sx={{ ...style }}>
                <Typography variant="body1" sx={{ color: "#83848f" }}>Font Family</Typography>

                <FormControl>
                    <RadioGroup
                        value={readStyle.fontFamily}
                        onChange={(event) => handleUpd('fontFamily', event.target.value)}
                    >{
                            fontFamilies.map((val) =>
                                <FormControlLabel value={val} control={<Radio />} label={val} />
                            )
                        }</RadioGroup>
                </FormControl>
            </ListItem>
        </List>
    );

    return (
        <>
            <Drawer
                key="big-screen"
                variant="persistent"
                anchor='right'
                open={readStyle.open}
                onClose={toggleDrawer}
                // onOpen={() => handleUpd('open', true)}
                sx={{ display: { xs: "none", sm: "block" } }}
            >
                {Content}
            </Drawer>

            <Drawer
                key="small-screen"
                variant="persistent"
                anchor="bottom"
                open={readStyle.open}
                onClose={toggleDrawer}
                // onOpen={() => handleUpd('open', true)}
                sx={{ display: { xs: "block", sm: "none" } }}
            >
                {Content}
            </Drawer>
        </>
    )
}

function Comp({ UrlUpd }){
    const data = useContext(Context);

    const nextChap = useContext(Context)?.nextChap;
    const prevChap = useContext(Context)?.prevChap;

    const text = Parser().parse(data?.chapter);
    
    const [readStyle, setReadStyle] = useState({ 
        fontSize: 16, open: false, fontFamily: "Adamina", theme: 0
    });
    const style = { color: "white", cursor: "pointer" }

    const handleUpd = (key, val) => {
        setReadStyle((prevState) => ({
            ...prevState,
            [key]: val 
        }))
    }

    useEffect(() => {
        WebFont.load({
            google: {
                families: fontFamilies
            }
        });
    }, []);

    const Navg = (
        <Stack
            direction="row" spacing={3} 
            sx={{ p: "1%", justifyContent: "center" }} 
        >
            <Button
                variant="outlined"
                startIcon={<ArrowBackIos />}
                onClick={() => UrlUpd(`/chapter/api/${prevChap[1]}`)}
                disabled={!prevChap}
            >
                Chapter
            </Button>

            <Button
                variant="outlined"
                endIcon={<ArrowForwardIos />}
                onClick={() => UrlUpd(`/chapter/api/${nextChap[1]}`)}
                disabled={!nextChap}
            >
                Next Chapter
            </Button>
        </Stack>
    )

    return (
        <Grid container sx={{ justifyContent: "center", backgroundColor: `${readStyle.theme[1]}`, pb: "3%" }}>
            <Grid item xs={12}>
                { Navg }
            </Grid>
            <Grid item 
                xs={12} sm={10} md={8} 
                sx={{ 
                    border: "#726b57 ridge", borderWidth: "1px", position: "realtive" 
                }}
            >
                <Typography variant="body1" 
                    sx={{ 
                        fontSize: `${readStyle.fontSize}px`, 
                        fontFamily: readStyle.fontFamily, 
                        p: "5%", 
                        backgroundColor: `${readStyle.theme[0]}`, 
                        color: `${readStyle.theme[2]}`
                    }}>
                    {text}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                {Navg}
            </Grid>

            <Stack spacing={2} direction={{ xs:"row", sm: "column" }}
                sx={{
                    display: "inline-flex",
                    justifyContent: "center",
                    position: { xs: "sticky", sm: "fixed" },
                    p: {xs: "2.5% 0", sm: "0 1%" },
                    top: 0,
                    bottom: 0,
                    right: 0,
                    height: { xs: "inherit", sm: "100%" },
                    width: { xs: "100%", sm: "2%" },
                    backgroundColor: "#383535"
                }}>
                <Settings onClick={() => handleUpd('open', true)}
                    sx={style} />
                <FormatListNumbered onClick={() => { }}
                    sx={style} />
            </Stack>
            <Sidebar readStyle={readStyle} handleUpd={handleUpd} />
        </Grid>
    )
}

export default function ChapReading(){
    const chapId = useLocation().pathname.split('/')[2];
    const [url, setUrl] = useState(`/chapter/api/${chapId}`)

    const info = useFetch(url)

    const UrlUpd = (url) => {
        setUrl(url);
    }
    return (
        <PageLayoutOverload
            nav="read"
            elem={<Comp UrlUpd={UrlUpd}/>}
            contextInfo={info}
        />
    )
}