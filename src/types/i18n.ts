export type I18nKeys = {
  siteTitle: string;
  screens: {
    addStudents: {
      title: string;
      heading: string;
      upload: {
        heading: string;
        dndArea: {
          instruction: string;
          format: string;
          onDrag: string;
        };
      };
      manual: {
        heading: string;
        placeholder: string
      };
      added: {
        heading: string;
        noStudentsAddedMessage: string;
        totalStudents: string;
        showAll: string;
        continue: string;
        remove: string;
        removeAll: string;
        removeAllError: string;
      };
    };
    create: {
      title: string;
      heading: string;
      numberOfTables: string;
      numberOfStudents: string;
      create: string;
    };
    assign: {
      title: string;
      heading: string;
      dnd: {
        heading: string;
        autoAssign: string;
        clearAssign: string;
        allAssigned: string;
        dropHere: string;
      };
      shuffle: string;
    };
  };
  errors: {
    notEnoughDesks: string;
    noDesk: string;
  };
  components: {
    grid: {
      desk: string;
      row: string;
      col: string;
      toolTips: {
        remove: string;
        insert: string;
        select: string;
      };
    };
    export: {
      title: string;
      copiedToClipboard: string;
    };
  };
  common: {
    add: string;
    remove: string;
    submit: string;
    goBack: string;
    reset: string;
    export: string;
    na: string;
    copy: string;
  };
};
