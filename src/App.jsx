import { useState } from "react";

const fonts = `@import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@300;400;600;700&family=DM+Mono:wght@400;500&family=Barlow+Condensed:wght@400;700;900&display=swap');`;

const css = `
  ${fonts}
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #07080f;
    --surface: #0e1018;
    --border: #1e2133;
    --ue-accent: #00d4ff;
    --ue-glow: rgba(0,212,255,0.15);
    --mc-accent: #5dfc6a;
    --mc-glow: rgba(93,252,106,0.15);
    --text: #d6ddf5;
    --muted: #4a5070;
    --mono: 'DM Mono', monospace;
    --display: 'Barlow Condensed', sans-serif;
    --body: 'Chakra Petch', sans-serif;
    --radius: 6px;
  }
  body { background: var(--bg); color: var(--text); font-family: var(--body); min-height: 100vh; }

  .app { min-height: 100vh; display: flex; flex-direction: column; }

  /* HEADER */
  .header {
    padding: 20px 32px;
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; gap: 16px;
    background: linear-gradient(180deg, #0b0d16 0%, transparent 100%);
  }
  .logo { font-family: var(--display); font-size: 28px; font-weight: 900; letter-spacing: 2px; }
  .logo span.ue { color: var(--ue-accent); }
  .logo span.mc { color: var(--mc-accent); }
  .logo-sub { font-size: 11px; letter-spacing: 3px; color: var(--muted); text-transform: uppercase; margin-top: 2px; }

  /* MODE SELECT */
  .mode-select {
    flex: 1; display: flex; align-items: center; justify-content: center;
    padding: 60px 24px;
    background: radial-gradient(ellipse 80% 60% at 50% 50%, #0d1020 0%, var(--bg) 100%);
  }
  .mode-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; max-width: 800px; width: 100%; }
  .mode-card {
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 40px 32px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.25s ease;
    background: var(--surface);
  }
  .mode-card::before {
    content: '';
    position: absolute; inset: 0;
    opacity: 0;
    transition: opacity 0.25s;
  }
  .mode-card.ue::before { background: var(--ue-glow); }
  .mode-card.mc::before { background: var(--mc-glow); }
  .mode-card:hover::before { opacity: 1; }
  .mode-card.ue:hover { border-color: var(--ue-accent); box-shadow: 0 0 30px rgba(0,212,255,0.1); }
  .mode-card.mc:hover { border-color: var(--mc-accent); box-shadow: 0 0 30px rgba(93,252,106,0.1); }
  .mode-icon { font-size: 48px; margin-bottom: 16px; }
  .mode-title { font-family: var(--display); font-size: 32px; font-weight: 900; letter-spacing: 1px; margin-bottom: 8px; }
  .mode-card.ue .mode-title { color: var(--ue-accent); }
  .mode-card.mc .mode-title { color: var(--mc-accent); }
  .mode-desc { color: var(--muted); font-size: 13px; line-height: 1.6; }
  .mode-badge {
    position: absolute; top: 16px; right: 16px;
    font-size: 10px; letter-spacing: 2px;
    padding: 4px 10px; border-radius: 99px;
    text-transform: uppercase; font-weight: 600;
  }
  .mode-card.ue .mode-badge { background: rgba(0,212,255,0.1); color: var(--ue-accent); border: 1px solid rgba(0,212,255,0.3); }
  .mode-card.mc .mode-badge { background: rgba(93,252,106,0.1); color: var(--mc-accent); border: 1px solid rgba(93,252,106,0.3); }

  /* WIZARD */
  .wizard { flex: 1; display: flex; flex-direction: column; max-width: 900px; margin: 0 auto; padding: 32px 24px; width: 100%; }
  .wiz-header { display: flex; align-items: center; gap: 16px; margin-bottom: 32px; }
  .back-btn {
    background: none; border: 1px solid var(--border); color: var(--muted);
    padding: 8px 16px; border-radius: var(--radius); cursor: pointer;
    font-family: var(--body); font-size: 12px; letter-spacing: 1px;
    transition: all 0.2s;
  }
  .back-btn:hover { border-color: var(--text); color: var(--text); }
  .wiz-title { font-family: var(--display); font-size: 24px; font-weight: 700; letter-spacing: 1px; }
  .wiz-title.ue { color: var(--ue-accent); }
  .wiz-title.mc { color: var(--mc-accent); }

  /* STEPS BAR */
  .steps-bar { display: flex; gap: 8px; margin-bottom: 40px; }
  .step-dot {
    height: 4px; flex: 1; border-radius: 2px;
    background: var(--border); transition: background 0.3s;
  }
  .step-dot.active.ue { background: var(--ue-accent); }
  .step-dot.active.mc { background: var(--mc-accent); }
  .step-dot.done.ue { background: rgba(0,212,255,0.4); }
  .step-dot.done.mc { background: rgba(93,252,106,0.4); }

  /* STEP CONTENT */
  .step-label { font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: var(--muted); margin-bottom: 12px; }
  .step-question { font-family: var(--display); font-size: 28px; font-weight: 700; margin-bottom: 28px; }

  /* OPTION GRID */
  .option-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; margin-bottom: 32px; }
  .option-card {
    border: 1px solid var(--border); border-radius: var(--radius);
    padding: 16px 14px; cursor: pointer;
    background: var(--surface); transition: all 0.2s;
    text-align: center;
  }
  .option-card:hover { border-color: var(--muted); }
  .option-card.selected.ue { border-color: var(--ue-accent); background: rgba(0,212,255,0.08); }
  .option-card.selected.mc { border-color: var(--mc-accent); background: rgba(93,252,106,0.08); }
  .option-emoji { font-size: 24px; margin-bottom: 8px; }
  .option-name { font-size: 13px; font-weight: 600; }
  .option-hint { font-size: 11px; color: var(--muted); margin-top: 4px; }

  /* MULTI SELECT */
  .multi-hint { font-size: 12px; color: var(--muted); margin-bottom: 16px; letter-spacing: 1px; }

  /* INPUT */
  .field-group { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }
  .field-label { font-size: 12px; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); }
  .field-input {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 12px 16px;
    color: var(--text); font-family: var(--body); font-size: 14px;
    outline: none; transition: border 0.2s; width: 100%;
  }
  .field-input:focus.ue { border-color: var(--ue-accent); }
  .field-input:focus.mc { border-color: var(--mc-accent); }
  .field-input option { background: #1a1d2e; }

  /* NAV BUTTONS */
  .wiz-nav { display: flex; gap: 12px; justify-content: flex-end; margin-top: 8px; }
  .btn-primary {
    padding: 12px 32px; border: none; border-radius: var(--radius);
    font-family: var(--display); font-size: 16px; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; cursor: pointer; transition: all 0.2s;
  }
  .btn-primary.ue { background: var(--ue-accent); color: #000; }
  .btn-primary.ue:hover { box-shadow: 0 0 20px rgba(0,212,255,0.4); }
  .btn-primary.mc { background: var(--mc-accent); color: #000; }
  .btn-primary.mc:hover { box-shadow: 0 0 20px rgba(93,252,106,0.4); }
  .btn-primary:disabled { opacity: 0.3; cursor: not-allowed; }

  /* RESULT */
  .result-grid { display: flex; flex-direction: column; gap: 20px; }
  .result-section {
    border: 1px solid var(--border); border-radius: var(--radius);
    overflow: hidden;
  }
  .result-section-header {
    padding: 12px 20px; display: flex; align-items: center; justify-content: space-between;
    border-bottom: 1px solid var(--border);
    font-size: 12px; letter-spacing: 2px; text-transform: uppercase; font-weight: 600;
  }
  .result-section-header.ue { background: rgba(0,212,255,0.05); color: var(--ue-accent); }
  .result-section-header.mc { background: rgba(93,252,106,0.05); color: var(--mc-accent); }
  .copy-btn {
    background: none; border: none; cursor: pointer; font-size: 14px;
    opacity: 0.6; transition: opacity 0.2s; padding: 2px 8px;
    font-family: var(--body); font-size: 11px; letter-spacing: 1px;
    color: inherit;
  }
  .copy-btn:hover { opacity: 1; }
  .result-body { padding: 20px; background: #080a12; }
  .code-block {
    font-family: var(--mono); font-size: 12px; line-height: 1.8;
    color: #b0bec5; white-space: pre-wrap; word-break: break-all;
  }
  .tag-row { display: flex; flex-wrap: wrap; gap: 8px; }
  .tag {
    font-size: 12px; padding: 4px 12px; border-radius: 99px;
    border: 1px solid var(--border); color: var(--muted);
  }
  .tag.ue { border-color: rgba(0,212,255,0.3); color: var(--ue-accent); background: rgba(0,212,255,0.05); }
  .tag.mc { border-color: rgba(93,252,106,0.3); color: var(--mc-accent); background: rgba(93,252,106,0.05); }
  .plugin-list { display: flex; flex-direction: column; gap: 10px; }
  .plugin-item {
    display: flex; align-items: flex-start; gap: 12px;
    padding: 12px; border: 1px solid var(--border); border-radius: var(--radius);
    background: #0b0d18;
  }
  .plugin-emoji { font-size: 20px; flex-shrink: 0; }
  .plugin-name { font-weight: 600; font-size: 13px; margin-bottom: 2px; }
  .plugin-desc { font-size: 11px; color: var(--muted); }
  .plugin-url { font-size: 10px; color: var(--ue-accent); margin-top: 4px; font-family: var(--mono); }
  .plugin-url.mc { color: var(--mc-accent); }
  .restart-btn {
    margin-top: 24px; width: 100%; padding: 14px;
    background: none; border: 1px dashed var(--border); border-radius: var(--radius);
    color: var(--muted); cursor: pointer; font-family: var(--body); font-size: 13px;
    letter-spacing: 2px; text-transform: uppercase; transition: all 0.2s;
  }
  .restart-btn:hover { border-color: var(--text); color: var(--text); }

  @media (max-width: 600px) {
    .mode-grid { grid-template-columns: 1fr; }
    .option-grid { grid-template-columns: repeat(2, 1fr); }
    .header { padding: 16px 20px; }
    .wizard { padding: 24px 16px; }
  }
`;

// ─── UE5 DATA ───────────────────────────────────────────────────────────────

const UE_GENRES = [
  { id: "fps", emoji: "🔫", name: "FPS / Shooter", hint: "First person action" },
  { id: "rpg", emoji: "⚔️", name: "Action RPG", hint: "Combat + progression" },
  { id: "horror", emoji: "👁️", name: "Horror", hint: "Atmosphere & dread" },
  { id: "platformer", emoji: "🏃", name: "Platformer", hint: "Movement puzzles" },
  { id: "openworld", emoji: "🌍", name: "Open World", hint: "Exploration focus" },
  { id: "survival", emoji: "🔥", name: "Survival", hint: "Crafting + danger" },
  { id: "stealth", emoji: "🥷", name: "Stealth", hint: "AI & detection" },
  { id: "roguelike", emoji: "🎲", name: "Roguelike", hint: "Procedural runs" },
];

const UE_MECHANICS = [
  { id: "combat", emoji: "⚔️", name: "Combat System" },
  { id: "inventory", emoji: "🎒", name: "Inventory" },
  { id: "crafting", emoji: "🔧", name: "Crafting" },
  { id: "dialogue", emoji: "💬", name: "Dialogue / NPC" },
  { id: "ai_enemy", emoji: "🤖", name: "Enemy AI" },
  { id: "procedural", emoji: "🌀", name: "Proc Gen" },
  { id: "multiplayer", emoji: "👥", name: "Multiplayer" },
  { id: "physics", emoji: "💥", name: "Physics" },
  { id: "stealth_sys", emoji: "🥷", name: "Stealth System" },
  { id: "skills", emoji: "⚡", name: "Skill Tree" },
  { id: "saving", emoji: "💾", name: "Save System" },
  { id: "quests", emoji: "📜", name: "Quest System" },
];

const UE_STYLES = [
  { id: "realistic", emoji: "📷", name: "Hyper Realistic", hint: "Lumen + Nanite" },
  { id: "stylized", emoji: "🎨", name: "Stylized", hint: "Cel-shading / toon" },
  { id: "dark", emoji: "🌑", name: "Dark / Gritty", hint: "Horror / noir" },
  { id: "scifi", emoji: "🚀", name: "Sci-Fi", hint: "Neon + metal" },
  { id: "fantasy", emoji: "🧙", name: "High Fantasy", hint: "Magic + nature" },
];

// ─── MC DATA ─────────────────────────────────────────────────────────────────

const MC_TYPES = [
  { id: "paper", emoji: "📄", name: "PaperMC", hint: "Best performance" },
  { id: "spigot", emoji: "🔌", name: "Spigot", hint: "Wide plugin support" },
  { id: "fabric", emoji: "🧵", name: "Fabric", hint: "Modded server" },
  { id: "vanilla", emoji: "🍦", name: "Vanilla", hint: "Pure Minecraft" },
];

const MC_MODES = [
  { id: "smp", emoji: "🏕️", name: "Survival SMP", hint: "Custom SMP" },
  { id: "rpg", emoji: "⚔️", name: "RPG Server", hint: "Classes & quests" },
  { id: "minigames", emoji: "🎮", name: "Minigames", hint: "BedWars, SkyWars etc" },
  { id: "creative", emoji: "🎨", name: "Creative Build", hint: "Building server" },
  { id: "prison", emoji: "⛏️", name: "Prison", hint: "Mine & rank up" },
  { id: "skyblock", emoji: "☁️", name: "Skyblock", hint: "Island survival" },
  { id: "factions", emoji: "🏴", name: "Factions", hint: "PvP + territory" },
];

const ALL_PLUGINS = {
  smp: [
    { name: "EssentialsX", desc: "Core commands: /spawn, /home, /tpa, etc.", url: "https://essentialsx.net", emoji: "🔑" },
    { name: "LuckPerms", desc: "Permission management & rank system", url: "https://luckperms.net", emoji: "🛡️" },
    { name: "Vault", desc: "Economy & permissions bridge", url: "https://github.com/MilkBowl/Vault", emoji: "💰" },
    { name: "WorldGuard", desc: "Region protection & flags", url: "https://dev.bukkit.org/projects/worldguard", emoji: "🗺️" },
    { name: "CoreProtect", desc: "Block logging & rollback anti-grief", url: "https://www.spigotmc.org/resources/coreprotect.8631/", emoji: "📋" },
    { name: "CMI", desc: "All-in-one player management tool", url: "https://www.spigotmc.org/resources/cmi.3742/", emoji: "⚙️" },
    { name: "dynmap", desc: "Live browser map of your world", url: "https://www.spigotmc.org/resources/dynmap.274/", emoji: "🌐" },
  ],
  rpg: [
    { name: "MythicMobs", desc: "Custom mobs, skills, drops & boss fights", url: "https://www.mythicmobs.net", emoji: "🐉" },
    { name: "Citizens", desc: "NPC framework for quests & shops", url: "https://citizensnpcs.co", emoji: "🧍" },
    { name: "Quests", desc: "Full quest system with objectives", url: "https://www.spigotmc.org/resources/quests.3711/", emoji: "📜" },
    { name: "MMOCore", desc: "Classes, skills, stats & professions", url: "https://gitlab.com/phoenix-dvpmt/mmocore", emoji: "⚡" },
    { name: "ItemsAdder", desc: "Custom items, weapons, textures via RP", url: "https://www.spigotmc.org/resources/itemsadder.73355/", emoji: "🗡️" },
    { name: "LuckPerms", desc: "Permission & rank management", url: "https://luckperms.net", emoji: "🛡️" },
  ],
  minigames: [
    { name: "BedWars1058", desc: "Full BedWars minigame plugin", url: "https://www.spigotmc.org/resources/bedwars1058.60255/", emoji: "🛏️" },
    { name: "SkyWarsReloaded", desc: "SkyWars with kits & arenas", url: "https://www.spigotmc.org/resources/skywars-reloaded.35901/", emoji: "☁️" },
    { name: "TAB", desc: "Custom scoreboard & tab list", url: "https://www.spigotmc.org/resources/tab.57806/", emoji: "📊" },
    { name: "Parties", desc: "Party/group system for minigames", url: "https://www.spigotmc.org/resources/parties.3709/", emoji: "👥" },
    { name: "CommandTimer", desc: "Auto-broadcasts & scheduled commands", url: "https://www.spigotmc.org/resources/commandtimer.6166/", emoji: "⏱️" },
  ],
  skyblock: [
    { name: "IridiumSkyblock", desc: "Modern skyblock with upgrades & missions", url: "https://www.spigotmc.org/resources/iridiumskyblock.62480/", emoji: "🏝️" },
    { name: "SuperiorSkyblock2", desc: "Full-featured island system", url: "https://www.spigotmc.org/resources/superiorskyblock2.87411/", emoji: "☁️" },
    { name: "ShopGUIPlus", desc: "Gui-based shop system", url: "https://www.spigotmc.org/resources/shopgui.6515/", emoji: "🛒" },
    { name: "BentoBox", desc: "Skyblock + CaveBlock + AcidIsland", url: "https://github.com/BentoBoxWorld/BentoBox", emoji: "📦" },
  ],
  factions: [
    { name: "Factions", desc: "Classic factions territory & war", url: "https://www.massivecraft.com/factions", emoji: "🏴" },
    { name: "mcMMO", desc: "RPG skill system for PvP", url: "https://mcmmo.org", emoji: "⚔️" },
    { name: "CombatLogX", desc: "Combat tagging anti-logout system", url: "https://www.spigotmc.org/resources/combatlogx.31689/", emoji: "⚡" },
    { name: "ChestShop", desc: "Player-run economy shops", url: "https://www.spigotmc.org/resources/chestshop.51856/", emoji: "💰" },
  ],
  creative: [
    { name: "WorldEdit", desc: "Powerful in-game world editing tool", url: "https://enginehub.org/worldedit", emoji: "✏️" },
    { name: "PlotSquared", desc: "Plot claiming & management", url: "https://www.spigotmc.org/resources/plotsquared-v6.77506/", emoji: "📐" },
    { name: "VoxelSniper", desc: "Advanced terrain sculpting brushes", url: "https://www.spigotmc.org/resources/voxelsniper-flyte.81099/", emoji: "🖌️" },
    { name: "FastAsyncWorldEdit", desc: "FAWE: WorldEdit but blazing fast", url: "https://www.spigotmc.org/resources/fastasyncworldedit.13932/", emoji: "⚡" },
  ],
  prison: [
    { name: "PrisonMines", desc: "Automated mine resetting & ranks", url: "https://www.spigotmc.org/resources/prison.1223/", emoji: "⛏️" },
    { name: "TokenEnchant", desc: "Custom enchants via tokens", url: "https://www.spigotmc.org/resources/tokenenchant.2287/", emoji: "✨" },
    { name: "EssentialsX", desc: "Core commands & economy", url: "https://essentialsx.net", emoji: "🔑" },
    { name: "LuckPerms", desc: "Rank-up system management", url: "https://luckperms.net", emoji: "🛡️" },
  ],
};

// ─── GENERATORS ──────────────────────────────────────────────────────────────

function generateUE5Output({ genre, mechanics, style, projectName }) {
  const g = UE_GENRES.find(x => x.id === genre);
  const s = UE_STYLES.find(x => x.id === style);
  const mecNames = mechanics.map(m => UE_MECHANICS.find(x => x.id === m)?.name).filter(Boolean);

  const folderStructure = `${projectName}/
├── Config/
│   ├── DefaultGame.ini
│   └── DefaultEngine.ini
├── Content/
│   ├── Blueprints/
│   │   ├── Characters/
│   │   │   ├── BP_PlayerCharacter
│   │   │   └── BP_EnemyBase
│   │   ├── GameFramework/
│   │   │   ├── BP_GameMode
│   │   │   └── BP_GameState
│   │   └── UI/
│   │       └── WBP_HUD
│   ├── Maps/
│   │   ├── MainMenu
│   │   └── Level_01
│   ├── Materials/
│   │   ├── M_${style === "dark" ? "Gritty" : style === "scifi" ? "SciFi" : "Base"}_Master
│   │   └── MI_PlayerSkin
│   ├── Meshes/
│   ├── Textures/
│   ├── Audio/
│   │   ├── Music/
│   │   └── SFX/
│   └── VFX/
├── Source/
│   └── ${projectName}/
│       ├── ${projectName}.Build.cs
│       ├── Characters/
│       │   ├── ${projectName}Character.h/.cpp
│       │   └── EnemyBase.h/.cpp
│       ├── Components/
│       │   ${mechanics.includes("combat") ? "├── CombatComponent.h/.cpp\n│       " : ""}${mechanics.includes("inventory") ? "├── InventoryComponent.h/.cpp\n│       " : ""}${mechanics.includes("skills") ? "└── SkillTreeComponent.h/.cpp" : ""}
│       └── GameFramework/
│           ├── ${projectName}GameMode.h/.cpp
│           └── ${projectName}PlayerController.h/.cpp
└── ${projectName}.uproject`;

  const cppSnippet = `// ${projectName}Character.h
#pragma once
#include "CoreMinimal.h"
#include "GameFramework/Character.h"
${mechanics.includes("combat") ? '#include "Components/CombatComponent.h"\n' : ""}${mechanics.includes("inventory") ? '#include "Components/InventoryComponent.h"\n' : ""}#include "${projectName}Character.generated.h"

UCLASS()
class ${projectName.toUpperCase()}_API A${projectName}Character : public ACharacter
{
    GENERATED_BODY()

public:
    A${projectName}Character();

protected:
    virtual void BeginPlay() override;
    virtual void SetupPlayerInputComponent(
        class UInputComponent* PlayerInputComponent) override;

    // Movement
    void MoveForward(float Value);
    void MoveRight(float Value);
    ${genre === "fps" ? "void LookUp(float Value);\n    void TurnRight(float Value);" : ""}

${mechanics.includes("combat") ? `    // Combat
    UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Combat")
    UCombatComponent* CombatComponent;
    
    UFUNCTION(BlueprintCallable)
    void Attack();` : ""}

${mechanics.includes("inventory") ? `    // Inventory
    UPROPERTY(VisibleAnywhere, BlueprintReadOnly, Category = "Inventory")
    UInventoryComponent* InventoryComp;` : ""}
